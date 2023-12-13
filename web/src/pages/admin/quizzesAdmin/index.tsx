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

    /*
    const createQuiz = async () => {
        const quizData = {
            quizID: 20,
            quizTitle: "Gitara",
            quizLength: 1,
            quizCreator: {
                id: 1,
                username: "admin",
                password: "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK",
                email: "admin@email.com",
                type: "ADMINISTRATOR"
            },
            quizOpenDate: new Date().toISOString(),
            listOfQuestions: [
                {
                    questionID: 20,
                    questionContent: "What is the capital of France?",
                    questionNumber: 20,
                    questionAnswers: [
                        {
                            answerID: 20,
                            answerContent: "Paris",
                        },
                        {
                            answerID: 21,
                            answerContent: "Berlin",
                        },
                    ],
                    correctAnswer: {
                        answerID: 22,
                        answerContent: "Paris",
                    },
                },
            ],
        };
        console.log('Quiz Data:', quizData);
        const config = {
            headers: { Authorization: `Bearer ${getAuthToken()}` }
        };
        await api.post("/quizzes/", quizData, config);
};
*/
/*
        const deleteQuiz = async () => {
            try {
                    await api.delete("/quizzes/id/2");

            } catch (error) {
                console.error("Error deleting quiz:", error);
            }
        };

 */
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

        {/* Add Quiz Buttons */}
        <div style={{marginBottom: '10px'}}>
            <button
                style={{
                    ...styles.buttonStyles,
                    backgroundColor: '#4CAF50',
                }}
            >
                Dodaj Quiz
            </button>

            <button
                style={{
                    ...styles.buttonStyles,
                    backgroundColor: '#f44336', /* Red */
                    marginLeft: '10px',
                }}
            >
                Usuń Quiz
            </button>

            <button
                style={{
                    ...styles.buttonStyles,
                    backgroundColor: '#008CBA', /* Blue */
                    marginLeft: '10px',
                }}
                onClick={() => {
                }}
            >
                Edytuj Quiz
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
    </div>
);
}
;

export default AdminQuizzes;
