import {FC, useEffect, useState} from "react";
import Modal from "react-modal";
import {api} from "../../../api/api.config.ts";
import * as styles from "./styles";

interface Quiz {
    quizID: number;
    quizTitle: string;
    quizCreatorName: string;
    quizOpenDate: Date;
    listOfQuestions: Array<{
        questionContent: string;
        listOfAnswers: Array<{
            answerContent: string;
            correct: boolean;
        }>;
    }>;
}

const AdminQuizzes: FC = () => {
        const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
        const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [addModalIsOpen, setAddModalIsOpen] = useState(false);

        useEffect(() => {
            api.get("/quizzes")
                .then(function (response) {
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return new Date(dateString).toLocaleString('PL', options);
        };

        const addQuiz = async () => {
            try {
                const NewTestQuiz = {
                    quizID: 1234,
                    quizTitle: "ReactAddQuizTest2",
                    quizCreatorName: "Tomek B",
                    quizOpenDate: "2024-01-01T13:09:35.394Z",
                    listOfQuestions: [
                        {
                            questionContent: "Czy piwo jest dobre?",
                            listOfAnswers: [
                                {
                                    answerContent: "Tak",
                                    correct: true
                                },
                                {
                                    answerContent: "Nie",
                                    correct: false
                                }
                            ],
                        },
                        {
                            questionContent: "Czy wino jest dobre?",
                            listOfAnswers: [
                                {
                                    answerContent: "Tak",
                                    correct: true
                                },
                                {
                                    answerContent: "Nie",
                                    correct: false
                                }
                            ],
                        }
                    ]
                }

                const responseQuiz = await api.post("/quizzes", NewTestQuiz);

                if (responseQuiz.status === 201) {
                    setQuizzes((prevQuizzes) => [...(prevQuizzes || []), responseQuiz.data]);
                } else {
                    console.error('Failed to add quiz:', responseQuiz.statusText);
                }
            } catch (error) {
                console.error('Error adding quiz:', error);
            }
        };

        const deleteQuiz = async (quizID: number) => {
            try {
                await api.delete(`/quizzes/id/${quizID}`);
                setQuizzes((prevQuizzes) => prevQuizzes?.filter(quiz => quiz.quizID !== quizID) || []);

            } catch (error) {
                console.error('Error deleting quiz:', error);
            }
        };

        return (
            <div>
                <h2 style={styles.headingStyles}>Panel zarządzania quizami</h2>

                <div style={{marginBottom: '10px', marginTop: '20px', textAlign: 'center'}}>
                    <button
                        style={{
                            ...styles.buttonStyles,
                            backgroundColor: 'green',
                        }}
                        onClick={() => setAddModalIsOpen(true)}
                    >
                        Dodaj Quiz
                    </button>
                </div>

                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {quizzes && quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <div
                                key={quiz.quizTitle}
                                onClick={() => openModal(quiz)}
                                style={styles.squareStyles}
                            >
                                <div style={{textAlign: 'center'}}>
                                    <strong>{quiz.quizTitle}</strong><br/><br/>
                                </div>
                                <strong>Twórca:</strong> {quiz.quizCreatorName}<br/>
                                <strong>Data Otwarcia:</strong> {formatOpeningDate(quiz.quizOpenDate)}<br/><br/>
                                <strong>Liczba pytań:</strong> {quiz.listOfQuestions.length}<br/>

                                <button
                                    style={{
                                        ...styles.buttonStyles,
                                        backgroundColor: 'red',
                                        marginTop: '10px'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteQuiz(quiz.quizID);
                                    }}
                                >
                                    Usuń Quiz
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Brak quizów.</p>
                    )}
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Selected Quiz"
                    style={styles.modalStyles}
                >
                    {selectedQuiz && (
                        <div>
                            <h2 style={styles.headingStyles}>{selectedQuiz.quizTitle}</h2>
                            <strong>Twórca:</strong> {selectedQuiz.quizCreatorName}<br/>
                            <strong>Data Otwarcia:</strong> {formatOpeningDate(selectedQuiz.quizOpenDate)}<br/><br/>
                            <h3 style={styles.headingStyles2}>Pytania</h3>
                            <ul>
                                {selectedQuiz.listOfQuestions.map((question, index) => (
                                    <li key={question.questionContent}>
                                        <strong>Pytanie {index + 1}:</strong> {question.questionContent}<br/>
                                        <strong>Odpowiedzi:</strong>
                                        <ul>
                                            {question.listOfAnswers.map((answer) => (
                                                <li key={answer.answerContent}>
                                                    {answer.answerContent}
                                                </li>
                                            ))}
                                        </ul>
                                        <br/>
                                    </li>
                                ))}
                            </ul>
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
                <Modal
                    isOpen={addModalIsOpen}
                    onRequestClose={() => setAddModalIsOpen(false)}
                    contentLabel="Add Quiz"
                    style={styles.modalStyles}
                >
                    <h2 style={styles.headingStyles}>Dodaj Quiz</h2>
                    <h3 style={styles.headingStyles2}>Uzupełnij dane o quizie:</h3>
                    <form>
                        <div style={{marginBottom: '15px'}}>
                            <label style={{fontWeight: 'bold'}}>Nazwa Quizu:</label>
                            <input type="text"
                                   style={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', marginLeft: '10px'}}/>
                        </div>
                        <div style={{marginBottom: '15px'}}>
                            <label style={{fontWeight: 'bold'}}>Twórca Quizu:</label>
                            <input type="text"
                                   style={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', marginLeft: '10px'}}/>
                        </div>
                        <div style={{marginBottom: '15px'}}>
                            <label style={{fontWeight: 'bold'}}>Data Otwarcia Quizu:</label>
                            <input type="datetime-local"
                                   style={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', marginLeft: '10px'}}/>
                        </div>
                        <div style={{marginBottom: '15px'}}>
                            <label style={{fontWeight: 'bold'}}>Pytania:</label>
                            <div>
                                <input type="text" placeholder="Treść pytania"
                                       style={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', marginRight: '10px'}}/>
                                <button
                                    style={{
                                        ...styles.buttonStyles,
                                        backgroundColor: 'black',
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log('Add new question (dummy action)');
                                    }}
                                >
                                    Dodaj pytanie
                                </button>
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <br/><label style={{fontWeight: 'bold'}}>Wybierz poprawną odpowiedź:</label>
                                <select style={{boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', marginLeft: '10px'}}>
                                    <option value="1">Odpowiedź 1</option>
                                    <option value="2">Odpowiedź 2</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <button
                        style={{
                            ...styles.buttonStyles,
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        onClick={() => setAddModalIsOpen(false)}
                    >
                        Zamknij
                    </button>
                    <button
                        style={{
                            ...styles.buttonStyles,
                            position: 'absolute',
                            bottom: '200px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'green',
                        }}
                    >
                        Zapisz Quiz
                    </button>
                </Modal>
                <button
                    style={{
                        ...styles.buttonStyles,
                        backgroundColor: 'orange',
                        marginLeft: '10px',
                    }}
                    onClick={addQuiz}
                >
                    Add New Quiz
                </button>

            </div>

        );
    }
;

export default AdminQuizzes;
