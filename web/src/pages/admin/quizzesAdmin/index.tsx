import {FC, useEffect, useState} from "react";
import Modal from "react-modal";
import {api} from "../../../api/api.config.ts";
import * as styles from "./styles";

interface Quiz {
    quizID: number;
    quizTitle: string;
    quizCreator: {
        id: number;
        username: string;
    };
    quizOpenDate: string;
    listOfQuestions: Array<{
        questionID: number;
        questionNumber: number;
        questionContent: string;
        questionAnswers: Array<{
            answerID: number;
            answerContent: string;
        }>;
        correctAnswer: {
            answerID: number;
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
            style={styles.modalStyles}
        >
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
            <h2>Delete Quiz</h2>
            <p>Select a quiz to delete:</p>
            <ul>
                {quizzes &&
                    quizzes.map((quiz) => (
                        <li key={quiz.quizID}>
                            {quiz.quizTitle}
                            <button
                                style={{
                                    ...styles.buttonStyles,
                                    backgroundColor: 'red',
                                    marginLeft: '10px',
                                }}
                                //onClick={() => handleDeleteQuiz(quiz.quizID)}
                            >
                                DELETE
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
    </div>
);
    }
;

export default AdminQuizzes;
