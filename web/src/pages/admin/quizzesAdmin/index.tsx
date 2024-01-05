import {FC, useEffect, useState} from "react";
import Modal from "react-modal";
import {api} from "../../../api/api.config.ts";
import * as styles from "./styles";

interface Quiz {
    quizID: number;
    quizTitle: string;
    quizCreator: {
        username: string;
    };
    quizOpenDate: string;
    listOfQuestions: Array<{
        questionNumber: number;
        questionContent: string;
        questionAnswers: Array<{
            answerContent: string;
        }>;
        correctAnswer: {
            answerContent: string;
        };
    }>;
}

const AdminQuizzes: FC = () => {
        const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
        const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [addModalIsOpen, setAddModalIsOpen] = useState(false);
        const [editModalIsOpen, setEditModalIsOpen] = useState(false);
        const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
        const [users, setUsers] = useState([]);

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

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await api.get('/users');
                    if (response.status === 200) {
                        setUsers(response.data);
                    } else {
                        console.error('Failed to fetch users:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };

            fetchUsers();
        }, []);

        const openModal = (quiz: Quiz) => {
            setSelectedQuiz(quiz);
            setModalIsOpen(true);
        };

        const closeModal = () => {
            setSelectedQuiz(null);
            setModalIsOpen(false);
        };

        const formatOpeningDate = (dateString: string) => {
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

        const addQuiz = async () => {
            try {
                const answer = {
                    answerContent: "Jeszcze jak",
                }
                const adminUser = users.find((user) => user.username === 'admin');
                const question = {
                    questionNumber: 20,
                    questionContent: "gitara siema?",
                    questionAnswers: [answer],
                    correctAnswer: answer,
                }
                const newQuiz = {
                    quizTitle: "PostMethodTest",
                    quizLength: 1,
                    quizCreator: adminUser,
                    quizOpenDate: new Date().toISOString(),
                    listOfQuestions: [question]
                };


                const responseQuiz = await api.post("/quizzes", newQuiz);

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
            const response = await api.delete(`/quizzes/id/${quizID}`);

            if (response.status === 204) {
                setQuizzes((prevQuizzes) => prevQuizzes?.filter(quiz => quiz.quizID !== quizID) || []);
            } else {
                console.error('Failed to delete quiz:', response.statusText);
            }

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
                    <button
                        style={{
                            ...styles.buttonStyles,
                            backgroundColor: 'blue',
                            marginLeft: '10px',
                        }}
                        onClick={() => setEditModalIsOpen(true)}
                    >
                        Edytuj Quiz
                    </button>
                    <button
                        style={{
                            ...styles.buttonStyles,
                            backgroundColor: 'red',
                            marginLeft: '10px',
                        }}
                        onClick={() => setDeleteModalIsOpen(true)}
                    >
                        Usuń Quiz
                    </button>
                </div>

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
                                <strong>Twórca:</strong> {quiz.quizCreator.username}<br/>
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
                            <strong>ID Quizu:</strong> {selectedQuiz.quizID}<br/>
                            <strong>Twórca:</strong> {selectedQuiz.quizCreator.username}<br/>
                            <strong>Data Otwarcia:</strong> {formatOpeningDate(selectedQuiz.quizOpenDate)}<br/><br/>
                            <h3 style={styles.headingStyles2}>Pytania</h3>
                            <ul>
                                {selectedQuiz.listOfQuestions.map((question, index) => (
                                    <li key={question.questionID}>
                                        <strong>Pytanie {index + 1}:</strong> {question.questionContent}<br/>
                                        <strong>Odpowiedzi:</strong>
                                        <ul>
                                            {question.questionAnswers.map((answer) => (
                                                <li key={answer.answerID}
                                                    style={answer.answerID === question.correctAnswer.answerID ? styles.correctAnswerStyles : styles.answerStyles}>
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
                    <h3 style={styles.headingStyles2}>Uzupełnij dane o quizie:</h3><br/>
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

                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={() => setEditModalIsOpen(false)}
                    contentLabel="Edit Quiz"
                    style={styles.modalStyles}
                >
                    <h2 style={styles.headingStyles}>Edytuj Quiz</h2>
                    <h3 style={styles.headingStyles2}>Wybierz quiz do edycji:</h3><br/>
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {quizzes &&
                            quizzes.map((quiz) => (
                                <li key={quiz.quizID}
                                    style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '20px'}}>
                        <strong>{quiz.quizTitle}</strong>
                    </span>
                                    <button
                                        style={{
                                            ...styles.buttonStyles,
                                            backgroundColor: 'blue',
                                        }}
                                    >
                                        Edytuj
                                    </button>
                                </li>
                            ))}
                    </ul>
                    <button
                        style={{
                            ...styles.buttonStyles,
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        onClick={() => setEditModalIsOpen(false)}
                    >
                        Zamknij
                    </button>
                </Modal>

                <Modal
                    isOpen={deleteModalIsOpen}
                    onRequestClose={() => setDeleteModalIsOpen(false)}
                    contentLabel="Delete Quiz"
                    style={styles.modalStyles}
                >
                    <h2 style={styles.headingStyles}>Usuń Quiz</h2>
                    <h3 style={styles.headingStyles2}>Wybierz quiz do usunięcia:</h3><br/>
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {quizzes &&
                            quizzes.map((quiz) => (
                                <li key={quiz.quizID}
                                    style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '20px'}}>
                        <strong>{quiz.quizTitle}</strong>
                    </span>
                                    <button
                                        style={{
                                            ...styles.buttonStyles,
                                            backgroundColor: 'red',
                                        }}
                                    >
                                        Usuń
                                    </button>
                                </li>
                            ))}
                    </ul>
                    <button
                        style={{
                            ...styles.buttonStyles,
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        onClick={() => setDeleteModalIsOpen(false)}
                    >
                        Zamknij
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
