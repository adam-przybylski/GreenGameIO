import React, {FC, useEffect, useState} from "react";
import Modal from "react-modal";
import {api} from "../../../../api/api.config.ts";
import * as styles from "../styles.ts";

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

const UnsolvedQuizzes: FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [solveModalIsOpen, setSolveModalIsOpen] = useState(false);
    const [currentScore, setCurrentScore] = useState<number | null>(null);
    const [resultModalIsOpen, setResultModalIsOpen] = useState(false);

    useEffect(() => {
        const localStorageItem = localStorage.getItem("account");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const parsedData = JSON.parse(localStorageItem);
        const idValue = parsedData.id;
        api.get(`/quizzes/user-id/${idValue}/unsolved`)
            .then(function (response) {
                console.table(response.data)
                setQuizzes(response.data);
            })
            .catch(function (error) {
                console.error("Error fetching quizzes:", error);
                setQuizzes([]);
            });

    }, []);

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
        setResultModalIsOpen(true);
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

            data[questionIndex].questionAnswers.forEach((answer, index) => {
                if (index !== answerIndex) {
                    answer.correct = false;
                }
            });

            data[questionIndex].questionAnswers[answerIndex].correct = !data[questionIndex].questionAnswers[answerIndex].correct;
            setFormFieldsQuestion(data);
        };

        const postAnswers: (listOfUserAnswers, selectedQuizID) => Promise<void> = async (listOfUserAnswers, selectedQuizID) => {
            const localStorageItem = localStorage.getItem("account");
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const parsedData = JSON.parse(localStorageItem);
            const idValue = parsedData.id;
            try {
                const response = await api.post(`/quizzes/id/${Number(selectedQuizID)}/check`, listOfUserAnswers)
                setCurrentScore(response.data.currentScore);
            } catch (error) {
                console.error('Error', error);
            } finally {
                api.get(`/quizzes/user-id/${idValue}/unsolved`)
                    .then(function (response) {
                        const filteredQuizzes = response.data.filter(quiz => new Date(quiz.quizOpenDate) < new Date());
                        setQuizzes(filteredQuizzes);
                    })
            }
        }
        const submit = (e) => {
            e.preventDefault();
            const listOfUserAnswers: UserAnswer[] = [];

            formFieldsQuestion.forEach((question) => {
                const correctAnswerIndex = question.questionAnswers.findIndex(answer => answer.correct);

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

            const toSend = {
                userID: idValue,
                listOfUserAnswers: listOfUserAnswers,
            }

            postAnswers(toSend, selectedQuiz.quizID);
            closeSolveQuizModal()
            setResultModalIsOpen(true)
        };

        const closeResultModal = () => {
            setResultModalIsOpen(false);
            setCurrentScore(null);
        };

        return (
            <div>
                <Modal
                    isOpen={resultModalIsOpen}
                    onRequestClose={closeResultModal}
                    currentScore={currentScore}
                    style={styles.smallModalStyles2}
                    ariaHideApp={false}
                >
                    <div>
                        <h2 style={styles.headingStyles}>Wynik quizu</h2>
                        {currentScore !== null && (
                            <div>
                                <strong>Ilość poprawnych odpowiedzi: </strong> {currentScore}<br/><br/>
                            </div>
                        )}
                        <button
                            style={{
                                ...styles.buttonStyles,
                                bottom: "20px",
                                left: "50%",
                            }}
                            onClick={closeResultModal}
                        >
                            <strong>Zamknij</strong>
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    contentLabel="Edit Correct Answers"
                    style={styles.bigModalStyles}
                    ariaHideApp={false}
                >
                    <div>
                        <h2 style={styles.headingStyles}>Rozwiązywanie quizu</h2>
                        <form>
                            {formFieldsQuestion.map((form, questionIndex) => {
                                return (
                                    <div key={questionIndex} style={{marginBottom: '10px'}}>
                                        <br/>
                                        <text style={{
                                            fontSize: "1.1em",
                                            fontWeight: "bold"
                                        }}>Pytanie {form.questionNumber}:
                                        </text>
                                        <text style={{
                                            fontSize: "1.1em",
                                            fontWeight: "bold"
                                        }}> {form.questionContent}</text>
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
                        <button
                            style={{
                                ...styles.buttonStyles,
                                bottom: '20px',
                                left: '50%',
                                backgroundColor: "red"
                            }}
                            onClick={submit}
                        >
                            <strong>Zapisz Podejście</strong>
                        </button>
                        <br/>
                        <br/>
                        <button
                            style={{
                                ...styles.buttonStyles,
                                bottom: '20px',
                                left: '50%',
                            }}
                            onClick={() => setSolveModalIsOpen(false)}
                        >
                            <strong>Anuluj</strong>
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }

    return (
        <div>
            <h2 style={styles.headingStyles}>Quizy Nierozwiązane</h2>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {quizzes && quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div
                            key={quiz.quizID}
                            onClick={() => openModal(quiz)}
                            style={styles.squareStyles}
                        >
                            <div style={{textAlign: 'center'}}>
                                <h3 style={styles.headingStyles4}>{quiz.quizTitle}</h3><br/>
                            </div>
                            <strong>Twórca:</strong> {quiz.quizCreatorName}<br/><br/>
                            <strong>Liczba pytań:</strong> {quiz.listOfQuestions.length}<br/>
                        </div>
                    ))
                ) : (
                    <strong>Brak nierozwiązanych quizów.</strong>
                )}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Selected Quiz"
                style={styles.smallModalStyles3}
                ariaHideApp={false}
            >
                {selectedQuiz && (
                    <div>
                        <h2 style={styles.headingStyles}>{selectedQuiz.quizTitle}</h2>
                        <strong>Twórca:</strong> {selectedQuiz.quizCreatorName}<br/>
                        <strong>Data otwarcia:</strong> {formatOpeningDate(selectedQuiz.quizOpenDate)}<br/>
                        <strong>Liczba pytań:</strong> {selectedQuiz.listOfQuestions.length}<br/><br/>
                        <br/><br/><br/>

                        <button style={{
                            ...styles.buttonStyles2,
                            left: '50%',
                        }} onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                            openSolveQuizModal(selectedQuiz);
                        }}>
                            Rozpocznij Quiz
                        </button>
                        <br/>
                        <br/>
                        <button style={{
                            ...styles.buttonStyles,
                            bottom: '10px',
                            left: '50%',
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


export default UnsolvedQuizzes;
