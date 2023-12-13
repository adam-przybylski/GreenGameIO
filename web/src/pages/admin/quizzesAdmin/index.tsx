import {FC, useState, useEffect} from "react";
import Modal from "react-modal";
import {api} from "../../../api/api.config.ts";

const modalStyles = {
    content: {
        width: '50%',
        height: '50%',
        margin: 'auto',
        padding: '20px',
    },
};

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
        questionContent: string;
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

    const openModal = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedQuiz(null);
        setModalIsOpen(false);
    };

    return (
        <div>
            <h2>Quizzes</h2>
            {quizzes && quizzes.length > 0 ? (
                <ul>
                    {quizzes.map((quiz) => (
                        <li key={quiz.quizID} onClick={() => openModal(quiz)}>
                            <strong>Quiz ID:</strong> {quiz.quizID}<br/>
                            <strong>Title:</strong> {quiz.quizTitle}<br/>
                            <strong>Creator:</strong> {quiz.quizCreator.username}<br/><br/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No quizzes available.</p>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Selected Quiz"
                style={modalStyles}
            >
                {selectedQuiz && (
                    <div>
                        <h2>Selected Quiz</h2>
                        <strong>Quiz ID:</strong> {selectedQuiz.quizID}<br/>
                        <strong>Title:</strong> {selectedQuiz.quizTitle}<br/>
                        <strong>Creator:</strong> {selectedQuiz.quizCreator.username}<br/>
                        <strong>Opening Date:</strong> {selectedQuiz.quizOpenDate}<br/><br/>
                        <h3>Questions</h3>
                        <ul>
                            {selectedQuiz.listOfQuestions.map((question) => (
                                <li key={question.questionID}>
                                    <strong>Question ID:</strong> {question.questionID}<br/>
                                    <strong>Content:</strong> {question.questionContent}<br/><br/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default AdminQuizzes;
