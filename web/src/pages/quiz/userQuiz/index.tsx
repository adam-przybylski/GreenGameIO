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

const Quizzes: FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        api.get("/quizzes")
            .then(function (response) {
                const filteredQuizzes = response.data.filter(quiz => new Date(quiz.quizOpenDate) < new Date());
                setQuizzes(filteredQuizzes);
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
            >
                {selectedQuiz && (
                    <div>
                        <h2 style={styles.headingStyles}>{selectedQuiz.quizTitle}</h2>
                        <strong>Twórca:</strong> {selectedQuiz.quizCreator.username}<br/>
                        <strong>Data Otwarcia:</strong> {formatOpeningDate(selectedQuiz.quizOpenDate)}<br/>
                        <strong>Twój Najlepszy Wynik: </strong>{1}<br/><br/>
                        <button style={{
                            ...styles.buttonStyles2,
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)'
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
        </div>
    );
};


export default Quizzes;
