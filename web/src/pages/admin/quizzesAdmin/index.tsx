import {FC, useEffect, useState} from "react";
import Modal from "react-modal";
import {api} from "../../../api/api.config.ts";
import * as styles from "./styles";
import AddQuizModal from "../../../components/modals/AddQuizModal.tsx";
import EditQuizModal from "../../../components/modals/EditQuizModal.tsx";

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

const AdminQuizzes: FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [deleteConfirmationModalIsOpen, setDeleteConfirmationModalIsOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

    useEffect(() => {
        api.get("/quizzes/correct")
            .then(response => setQuizzes(response.data))
            .catch(error => {
                console.error("Error fetching quizzes:", error);
                setQuizzes([]);
            });
    }, []);

    const openSelectedQuizModal = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setModalIsOpen(true);
    };

    const closeSelectedQuizModal = () => {
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
    const openEditQuizModal = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setEditModalIsOpen(true);
    };

    const postNewQuiz = async (newQuiz: Quiz) => {
        try {
            await api.post("/quizzes", newQuiz);
            api.get("/quizzes")
                .then(response => setQuizzes(response.data))
        } catch (error) {
            console.error('Error', error);
        }
    }

    const postUpdatedQuiz = async (updatedQuiz: Quiz) => {
        const quizGeneralInfo = {
            quizTitle: updatedQuiz.quizTitle,
            quizOpenDate: updatedQuiz.quizOpenDate
        }

        const quizModifiedQuestions = {
            listOfQuestions: updatedQuiz.listOfQuestions
        }

        console.log(updatedQuiz.quizID)
        console.table(updatedQuiz.listOfQuestions)
        console.log(quizModifiedQuestions)

        try {
            await api.put(`/quizzes/id/${Number(updatedQuiz.quizID)}/modify-general`, quizGeneralInfo)
        } catch (error) {
            console.error('Error', error);
        }

        try {
            await api.put(`/quizzes/id/${Number(updatedQuiz.quizID)}/modify-questions`, quizModifiedQuestions)
        } catch (error) {
            console.error('Error', error);
        } finally {
            api.get("/quizzes/correct")
                .then(response => setQuizzes(response.data))
        }
    }

    const closeEditQuizModal = () => {
        setSelectedQuiz(null);
        setEditModalIsOpen(false);
    };
    const addSampleQuiz = async () => {
        try {

            const answerYes: Answer = {
                answerContent: "Tak", correct: true
            }

            const answerNo: Answer = {
                answerContent: "Nie", correct: false
            }

            const question1: Question = {
                questionContent: "Czy piwo jest dobre?",
                listOfAnswers: [answerYes, answerNo],
            }

            const question2: Question = {
                questionContent: "Czy wino jest dobre?",
                listOfAnswers: [answerYes, answerNo],
            }

            const newTestQuiz: Quiz = {
                quizID: 0,
                quizTitle: "ReactAddQuizTest3",
                quizCreatorName: "Tomek B",
                quizOpenDate: new Date("2024-01-01T13:09:35.394Z"),
                listOfQuestions: [question1, question2]
            };

            const responseQuiz = await api.post("/quizzes", newTestQuiz);

            if (responseQuiz.status === 201) {
                setQuizzes(prevQuizzes => [...(prevQuizzes || []), responseQuiz.data]);
            } else {
                console.error('Failed to add quiz:', responseQuiz.statusText);
            }
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    const deleteQuiz = (quiz: Quiz) => {
        setQuizToDelete(quiz);
        setDeleteConfirmationModalIsOpen(true);
    };

    const confirmDeleteQuiz = async () => {
        if (quizToDelete) {
            try {
                await api.delete(`/quizzes/id/${quizToDelete.quizID}`);
                setQuizzes(prevQuizzes => prevQuizzes?.filter(q => q.quizID !== quizToDelete.quizID) || []);
                setDeleteConfirmationModalIsOpen(false);
            } catch (error) {
                console.error('Error deleting quiz:', error);
            }
        }
    };

    const updateQuiz = (updatedQuiz: Quiz) => {
        console.log("Updated Quiz:", updatedQuiz);
        closeEditQuizModal();
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
                    quizzes.map(quiz => (
                        <div
                            key={quiz.quizTitle}
                            onClick={() => openSelectedQuizModal(quiz)}
                            style={styles.squareStyles}
                        >
                            <button
                                style={{
                                    ...styles.buttonStylesClose,
                                    backgroundColor: 'red',
                                    marginTop: '10px'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteQuiz(quiz);
                                }}
                            >
                                Usuń
                            </button>
                            <button
                                style={{
                                    ...styles.buttonStylesClose,
                                    backgroundColor: 'blue',
                                    marginTop: '10px',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openEditQuizModal(quiz);
                                }}
                            >
                                Edytuj
                            </button>
                            <div style={{textAlign: 'center'}}>
                                <strong>{quiz.quizTitle}</strong><br/><br/>
                            </div>
                            <strong>Twórca:</strong> {quiz.quizCreatorName}<br/>
                            <strong>Data Otwarcia:</strong> {formatOpeningDate(quiz.quizOpenDate)}<br/><br/>
                            <strong>Liczba pytań:</strong> {quiz.listOfQuestions.length}<br/>
                        </div>
                    ))
                ) : (
                    <p>Brak quizów.</p>
                )}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeSelectedQuizModal}
                contentLabel="Selected Quiz"
                style={styles.modalStyles}
                ariaHideApp={false}
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
                                        {question.listOfAnswers.map(answer => (
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
                        }} onClick={closeSelectedQuizModal}>
                            Zamknij
                        </button>
                    </div>
                )}
            </Modal>
            <Modal
                isOpen={deleteConfirmationModalIsOpen}
                onRequestClose={() => setDeleteConfirmationModalIsOpen(false)}
                contentLabel="Delete Confirmation"
                style={styles.smallModalStyles}
                ariaHideApp={false}
            >
                <div style={{textAlign: 'center'}}>
                    <h2 style={styles.smallModalText}>
                        Czy na pewno chcesz usunąć quiz "{quizToDelete?.quizTitle}"?
                    </h2>
                    {quizToDelete && (
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button
                                style={{
                                    ...styles.buttonStyles,
                                    backgroundColor: 'red',
                                    margin: '10px',
                                }}
                                onClick={confirmDeleteQuiz}
                            >
                                Tak, usuń
                            </button>
                            <button
                                style={{
                                    ...styles.buttonStyles,
                                    marginLeft: '10px',
                                    margin: '10px',
                                }}
                                onClick={() => setDeleteConfirmationModalIsOpen(false)}
                            >
                                Anuluj
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
            <Modal
                isOpen={addModalIsOpen}
                onRequestClose={() => setAddModalIsOpen(false)}
                contentLabel="Add Quiz"
                style={styles.bigModalStyles}
                ariaHideApp={false}
            >
                <h2 style={styles.headingStyles}>Dodaj Quiz</h2>
                <h3 style={styles.headingStyles2}>Uzupełnij dane o quizie:</h3>
                <AddQuizModal postNewQuiz={postNewQuiz} setAddModalIsOpen={setAddModalIsOpen}/>
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
                isOpen={editModalIsOpen}
                onRequestClose={() => setEditModalIsOpen(false)}
                contentLabel="Edit Quiz"
                style={styles.bigModalStyles}
                ariaHideApp={false}
            >
                <h2 style={styles.headingStyles}>Edytuj Quiz</h2>
                <h3 style={styles.headingStyles2}>Uzupełnij dane o quizie:</h3>
                <EditQuizModal postUpdatedQuiz={postUpdatedQuiz} setEditModalIsOpen={setEditModalIsOpen}
                               onUpdateQuiz={updateQuiz} selectedQuiz={selectedQuiz}/>
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
            <button
                style={{
                    ...styles.buttonStyles,
                    backgroundColor: 'orange',
                    marginLeft: '10px',
                }}
                onClick={addSampleQuiz}
            >
                Add Test Quiz
            </button>
        </div>
    );
};

export default AdminQuizzes;
