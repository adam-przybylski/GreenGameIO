import {FC, useEffect, useState} from "react";
import Modal from "react-modal";
import {api} from "../../../api/api.config.ts";
import * as styles from "./styles";
import AddQuizModal from "../../../components/modals/AddQuizModal.tsx";
import EditQuizModal from "../../../components/modals/EditQuizModal.tsx";
import {FaCheck} from "react-icons/fa";

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
        // console.log("Updated Quiz:", updatedQuiz);
        closeEditQuizModal();
    };

    return (
        <div>
            <h2 style={styles.headingStyles}>Panel zarządzania quizami</h2>

            <div style={{marginBottom: '10px', marginTop: '20px', textAlign: 'center'}}>
                <button
                    style={{
                        ...styles.buttonStyles,
                    }}
                    onClick={() => setAddModalIsOpen(true)}
                >
                    <strong>Utwórz Nowy Quiz</strong>
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
                            <div style={{textAlign: 'center'}}>
                                <h5 style={styles.headingStyles3}>{quiz.quizTitle}</h5>
                            </div>
                            <strong>Twórca:</strong> {quiz.quizCreatorName}<br/>
                            <strong>Data Otwarcia:</strong> {formatOpeningDate(quiz.quizOpenDate)}<br/><br/>
                            <strong>Liczba pytań:</strong> {quiz.listOfQuestions.length}<br/>
                            <button
                                style={{
                                    ...styles.buttonStylesClose,
                                    backgroundColor: 'red',
                                    marginTop: '20px',
                                    marginLeft: '15%'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteQuiz(quiz);
                                }}
                            >
                                <strong>Usuń</strong>
                            </button>
                            <button
                                style={{
                                    ...styles.buttonStylesClose,
                                    marginTop: '20px',
                                    marginLeft: '24%',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openEditQuizModal(quiz);
                                }}
                            >
                                <strong>Edytuj</strong>
                            </button>
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
                                            <li
                                                key={answer.answerContent}
                                                style={{
                                                    color: answer.correct ? 'green' : 'black',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {answer.correct && <FaCheck
                                                    style={{marginRight: '5px'}}/>}
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
                            <strong>Zamknij</strong>
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
                                <strong>Tak, usuń</strong>
                            </button>
                            <button
                                style={{
                                    ...styles.buttonStyles,
                                    marginLeft: '10px',
                                    margin: '10px',
                                }}
                                onClick={() => setDeleteConfirmationModalIsOpen(false)}
                            >
                                <strong>Anuluj</strong>
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
                <h2 style={styles.headingStyles}>Utwórz Nowy Quiz</h2>
                <h3 style={styles.headingStyles2}>Uzupełnij dane o quizie:</h3>
                <AddQuizModal postNewQuiz={postNewQuiz} setAddModalIsOpen={setAddModalIsOpen}/>
                <button
                    style={{
                        ...styles.buttonStyles,
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                    onClick={() => setAddModalIsOpen(false)}
                >
                    <strong>Zamknij</strong>
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
                    <strong>Zamknij</strong>
                </button>
            </Modal>
        </div>
    );
};

export default AdminQuizzes;
