import React, {FC, useEffect, useState} from "react";
import Modal from "react-modal";
import {api} from "../../../api/api.config.ts";
import * as styles from "./styles";


interface Answer {
    answerContent: string;
    correct: boolean;
}

interface Question {
    questionContent: string;
    listOfAnswers: Answer[];
}

interface Quiz {
    quizID: number;
    quizTitle: string;
    quizCreatorName: string;
    quizOpenDate: Date;
    listOfQuestions: Question[];
}

interface UserAnswer {
    questionNumber: number;
    answerNumber: number;
}

const Quizzes: FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [solveModalIsOpen, setSolveModalIsOpen] = useState(false);
    const [bestScore, setBestScore] = useState<number | null>(null);
    // const [hasFetchedHiScore, setHasFetchedHiScore] = useState<{ [userId: number]: { [quizId: number]: boolean } }>({});

    useEffect(() => {
        api.get("/quizzes/correct")
            .then(function (response) {
                const filteredQuizzes = response.data.filter(quiz => new Date(quiz.quizOpenDate) < new Date());
                setQuizzes(filteredQuizzes);
            })
            .catch(function (error) {
                console.error("Error fetching quizzes:", error);
                setQuizzes([]);
            });

    }, []);

    // function useFetchData(selectedQuiz) {
    //     const [data1, setData] = React.useState([]);
    //
    //     const localStorageItem = localStorage.getItem("account");
    //     const parsedData = JSON.parse(localStorageItem);
    //     const userID = parsedData.id;
    //
    //     useEffect(() => {
    //         api.get(`/quizzes/id/${selectedQuiz.quizID}/user-id/${userID}`)
    //             .then((responseJson) => {
    //                 setData(responseJson.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }, []);
    //
    //     return {data1};
    // }


    // useEffect(() => {
    //     const localStorageItem = localStorage.getItem("account");
    //     if (localStorageItem) {
    //         // @ts-ignore
    //         const parsedData = JSON.parse(localStorageItem);
    //         const userID = parsedData.id;
    //         console.log(hasFetchedHiScore[userID])
    //         if (!hasFetchedHiScore[userID]) {
    //             const updatedFetchStatus = { ...hasFetchedHiScore };
    //             if (selectedQuiz && !updatedFetchStatus[userID]?.[selectedQuiz.quizID]) {
    //                 api.get(`/quizzes/id/${selectedQuiz.quizID}/user-id/${userID}`)
    //                     .then((response) => {
    //                         setBestScore(response.data || null);
    //                         updatedFetchStatus[userID] = {
    //                             ...(updatedFetchStatus[userID] || {}),
    //                             [selectedQuiz.quizID]: true,
    //                         };
    //
    //                         setHasFetchedHiScore(updatedFetchStatus);
    //                     })
    //                     .catch((error) => {
    //                         console.error("Error fetching best score:", error);
    //                         setBestScore(null);
    //                     });
    //             }
    //         }
    //     }
    // }, [selectedQuiz, hasFetchedHiScore]);
    //
    useEffect(() => {
        const localStorageItem = localStorage.getItem("account");
        if (localStorageItem) {
            // @ts-ignore
            const parsedData = JSON.parse(localStorageItem);
            const userID = parsedData.id;

            if (userID != null) {
                if (selectedQuiz) {
                    api.get(`/quizzes/id/${selectedQuiz.quizID}/user-id/${userID}`)
                        .then((response) => {
                            setBestScore(response.data || null);
                        })
                        .catch((error) => {
                            console.error('Error:', error.message);
                            setBestScore(null);
                        });
                }
            }
        }
    }, [selectedQuiz])

    const openModal = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedQuiz(null);
        setModalIsOpen(false);
    };

    const formatOpeningDate = (dateString: Date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return new Date(dateString).toLocaleString('PL', options);
    };
    const openSolveQuizModal = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setSolveModalIsOpen(true);
    };

    const closeSolveQuizModal = () => {
        setSelectedQuiz(null);
        setSolveModalIsOpen(false);
    };

    function SolveQuiz({selectedQuiz, isOpen, onClose}) {
        const [formFieldsQuestion, setFormFieldsQuestion] = useState(
            selectedQuiz?.listOfQuestions.map((question) => {
                return {
                    questionContent: question.questionContent,
                    questionNumber: question.questionNumber,
                    questionAnswers: question.listOfAnswers.map((answer) => {
                        return {
                            answerContent: answer.answerContent,
                            correct: false,
                        };
                    }),
                };
            }) || [
                {questionContent: "", questionAnswers: [{answerContent: "", correct: false}]},
            ]
        );

        const handleCorrectChange = (questionIndex, answerIndex) => {
            let data = [...formFieldsQuestion];
            data[questionIndex].questionAnswers[answerIndex].correct = !data[questionIndex].questionAnswers[answerIndex].correct;
            setFormFieldsQuestion(data);
            console.log('Updated State:', data);
        };

        const postAnswers: (listOfUserAnswers, selectedQuizID) => Promise<void> = async (listOfUserAnswers, selectedQuizID) => {
            try {
                await api.post(`/quizzes/id/${Number(selectedQuizID)}/check`, listOfUserAnswers)
            } catch (error) {
                console.error('Error', error);
            } finally {
                api.get("/quizzes/correct")
                    .then(function (response) {
                        const filteredQuizzes = response.data.filter(quiz => new Date(quiz.quizOpenDate) < new Date());
                        setQuizzes(filteredQuizzes);
                    })
            }
        }
        const submit = (e) => {
            e.preventDefault();

            const listOfUserAnswers: UserAnswer[] = [];

            selectedQuiz.listOfQuestions.forEach((question) => {
                console.log('Question Number:', question.questionNumber);
                console.table('List of Answers:', question.listOfAnswers);

                const correctAnswerIndex = question.listOfAnswers.findIndex((answer) => answer.correct);
                console.log('Correct Answer Index:', correctAnswerIndex);

                if (correctAnswerIndex !== -1) {
                    listOfUserAnswers.push({
                        questionNumber: question.questionNumber,
                        answerNumber: correctAnswerIndex + 1,
                    });
                }
            });

            const localStorageItem = localStorage.getItem("account");
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const parsedData = JSON.parse(localStorageItem);
            const idValue = parsedData.id;
            console.log(idValue);

            const toSend = {
                userID: idValue,
                listOfUserAnswers: listOfUserAnswers,
            }

            console.log('List of User Answers:', toSend);
            postAnswers(toSend, selectedQuiz.quizID);
            closeSolveQuizModal()
        };

        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Edit Correct Answers"
                style={styles.bigModalStyles}
                ariaHideApp={false}
            >
                <div>
                    <form>
                        {formFieldsQuestion.map((form, questionIndex) => {
                            return (
                                <div key={questionIndex} style={{marginBottom: '10px'}}>
                                    <strong>Pytanie {form.questionNumber}: </strong>
                                    <strong>{form.questionContent}</strong>
                                    {form.questionAnswers.map((answer, answerIndex) => (
                                        <div key={answerIndex}
                                             style={{marginBottom: '5px', display: 'flex', alignItems: 'center'}}>
                                            <p style={{marginRight: '10px'}}>{answer.answerContent}</p>
                                            <input
                                                type="checkbox"
                                                name="correct"
                                                onChange={() => handleCorrectChange(questionIndex, answerIndex)}
                                                checked={answer.correct}
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </form>
                    <br/>
                    <button onClick={submit}>Submit</button>

                    <button
                        style={{
                            ...styles.buttonStyles,
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        );
    }

    return (
        <div>
            <h2 style={styles.headingStyles}>Quizy</h2>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {quizzes && quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div
                            key={quiz.quizID}
                            onClick={() => openModal(quiz)}
                            style={styles.squareStyles}
                        >
                            <div style={{textAlign: 'center'}}>
                                <strong>{quiz.quizTitle}</strong><br/><br/>
                            </div>
                            <strong>Data Otwarcia:</strong> {formatOpeningDate(quiz.quizOpenDate)}<br/><br/>
                            <strong>Liczba pytań:</strong> {quiz.listOfQuestions.length}<br/>
                        </div>
                    ))
                ) : (
                    <p>Brak Quizów.</p>
                )}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Selected Quiz"
                style={styles.modalStyles}
                ariaHideApp={false}
            >
                {selectedQuiz && (
                    <div>
                        <h2 style={styles.headingStyles}>{selectedQuiz.quizTitle}</h2>
                        <strong>Twórca:</strong> {selectedQuiz.quizCreatorName}<br/>
                        <strong>Data Otwarcia:</strong> {formatOpeningDate(selectedQuiz.quizOpenDate)}<br/>
                        {/*<strong>Twój Najlepszy Wynik: </strong>{1}<br/><br/>*/}
                        {/*<strong>Twój Najlepszy Wynik: </strong>{bestScore}<br/><br/>*/}
                        <strong>Twój Najlepszy Wynik: </strong>{1}<br/><br/>
                        <strong>Twój Najlepszy
                            Wynik: </strong>{bestScore !== null ? bestScore : "Brak danych"}<br/><br/>
                        <button style={{
                            ...styles.buttonStyles2,
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }} onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                            openSolveQuizModal(selectedQuiz);
                        }}>
                            Rozpocznij Quiz
                        </button>
                        <button style={{
                            ...styles.buttonStyles,
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }} onClick={closeModal}>
                            Zamknij
                        </button>
                    </div>
                )}
            </Modal>
            <SolveQuiz
                selectedQuiz={selectedQuiz}
                isOpen={solveModalIsOpen}
                onClose={closeSolveQuizModal}
            ></SolveQuiz>
        </div>
    );
};


export default Quizzes;
