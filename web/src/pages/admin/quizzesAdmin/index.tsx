import {FC, useEffect, useState} from "react";
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

const AdminQuizzes: FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [deleteConfirmationModalIsOpen, setDeleteConfirmationModalIsOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);


    useEffect(() => {
        api.get("/quizzes")
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
        setEditModalIsOpen(true);
    };
    const closeEditQuizModal = () => {
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

    function AddQuiz() {
        const [formFieldsQuiz, setFormFieldsQuiz] = useState([
            {quizTitle: "", quizCreator: "", quizOpenDate: new Date()},
        ]);

        const [formFieldsQuestion, setFormFieldsQuestion] = useState([
            {questionContent: "", questionAnswers: [{answerContent: "", correct: false}]},
        ]);

        const handleQuizFormChange = (event, index) => {
            let data = [...formFieldsQuiz];
            data[index][event.target.name] = event.target.value;
            setFormFieldsQuiz(data);
        };

        const handleQuestionFormChange = (event, index) => {
            let data = [...formFieldsQuestion];
            data[index][event.target.name] = event.target.value;
            setFormFieldsQuestion(data);
        };

        const handleAnswerFormChange = (event, questionIndex, answerIndex) => {
            let data = [...formFieldsQuestion];
            if (event.target.type === "checkbox") {
                data[questionIndex].questionAnswers[answerIndex][event.target.name] = event.target.checked;
            } else {
                data[questionIndex].questionAnswers[answerIndex][event.target.name] = event.target.value;
            }
            setFormFieldsQuestion(data);
        };

        const submit = (e) => {
            e.preventDefault();

            if (formFieldsQuiz[0].quizTitle.trim() === '') {
                console.error('Quiz name is required.');
                return;
            }

            if (formFieldsQuiz[0].quizCreator.trim() === '') {
                console.error('Creator name is required.');
                return;
            }

            if (!formFieldsQuiz[0].quizOpenDate) {
                console.error('Quiz date is required.');
                return;
            }

            if (formFieldsQuestion.length === 0 || formFieldsQuestion.length > 10) {
                console.error('A quiz must contain between 1 and 10 questions.');
                return;
            }

            for (const question of formFieldsQuestion) {
                if (
                    question.questionContent.trim() === '' ||
                    question.questionAnswers.length < 2 ||
                    question.questionAnswers.length > 5 ||
                    !question.questionAnswers.some(answer => answer.correct)
                ) {
                    console.error('Each question must have a content, between 2 and 5 answers, and at least 1 correct answer.');
                    return;
                }
            }

            console.log(formFieldsQuiz);
            console.log(formFieldsQuestion);

            const newQuiz: Quiz = {
                quizID: 0,
                quizTitle: formFieldsQuiz[0].quizTitle,
                quizCreatorName: formFieldsQuiz[0].quizCreator,
                quizOpenDate: new Date(formFieldsQuiz[0].quizOpenDate),
                listOfQuestions: formFieldsQuestion.map((question) => {
                    return {
                        questionContent: question.questionContent,
                        listOfAnswers: question.questionAnswers.map((answer) => {
                            return {
                                answerContent: answer.answerContent,
                                correct: answer.correct,
                            };
                        }),
                    };
                }),
            };
            postNewQuiz(newQuiz)
            setAddModalIsOpen(false)
        }

        const postNewQuiz = async (newQuiz: Quiz) => {
            try{
                await api.post("/quizzes", newQuiz);
                api.get("/quizzes")
                    .then(response => setQuizzes(response.data))
            }
            catch(error) {
                console.error('Error', error);
            }
        }

        const addQuestion = (e) => {
            e.preventDefault();
            let object = {
                questionContent: "",
                questionAnswers: [{answerContent: "", correct: false}],
            };

            setFormFieldsQuestion([...formFieldsQuestion, object]);
        };

        const addAnswer = (questionIndex) => {
            let data = [...formFieldsQuestion];
            data[questionIndex].questionAnswers.push({answerContent: "", correct: false});
            setFormFieldsQuestion(data);
        };

        const removeQuestion = (index) => {
            let data = [...formFieldsQuestion];
            data.splice(index, 1);
            setFormFieldsQuestion(data);
        };

        const removeAnswer = (questionIndex, answerIndex) => {
            let data = [...formFieldsQuestion];
            data[questionIndex].questionAnswers.splice(answerIndex, 1);
            setFormFieldsQuestion(data);
        };

        return (
            <div className="AddQuiz">
                <form>
                    {formFieldsQuiz.map((form, index) => {
                        return (
                            <div key={index}>
                                <input
                                    name="quizTitle"
                                    placeholder="Treść pytania"
                                    onChange={(event) => handleQuizFormChange(event, index)}
                                    value={form.quizTitle}
                                    required={true}
                                />
                                <br/>
                                <input
                                    name="quizCreator"
                                    placeholder="Twórca Quizu"
                                    onChange={(event) => handleQuizFormChange(event, index)}
                                    value={form.quizCreator}
                                    required={true}
                                />
                                <br/>
                                <input
                                    type="datetime-local"
                                    onChange={(event) => handleQuizFormChange(event, index)}
                                    defaultValue={form.quizOpenDate.toISOString().slice(0, 16)}
                                    key={`quizOpenDate-${index}`}
                                    required={true}
                                />
                            </div>
                        );
                    })}
                </form>
                <br/>
                <br/>
                <form>
                    {formFieldsQuestion.map((form, questionIndex) => {
                        return (
                            <div key={questionIndex}>
                                <input
                                    name="questionContent"
                                    placeholder="Treść Pytania"
                                    onChange={(event) => handleQuestionFormChange(event, questionIndex)}
                                    value={form.questionContent}
                                />
                                <br/>
                                {form.questionAnswers.map((answer, answerIndex) => (
                                    <div key={answerIndex}>
                                        <input
                                            name="answerContent"
                                            placeholder="Treść Odpowiedzi"
                                            onChange={(event) => handleAnswerFormChange(event, questionIndex, answerIndex)}
                                            value={answer.answerContent}
                                        />
                                        <input
                                            type="checkbox"
                                            name="correct"
                                            label="Czy poprawne?"
                                            onChange={(event) => handleAnswerFormChange(event, questionIndex, answerIndex)}
                                            checked={answer.correct}
                                        />
                                        <button type="button" onClick={() => removeAnswer(questionIndex, answerIndex)}>
                                            Remove Answer
                                        </button>
                                        <br/>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addAnswer(questionIndex)}>
                                    Add an Answer
                                </button>
                                <br/>
                                <button type="button" onClick={() => removeQuestion(questionIndex)}>
                                    Remove Question
                                </button>
                            </div>
                        );
                    })}
                </form>
                <br/>
                <button onClick={addQuestion}>Add A Question</button>
                <br/>
                <button onClick={submit}>Submit</button>
            </div>
        );
    }

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
                isOpen={addModalIsOpen}
                onRequestClose={() => setAddModalIsOpen(false)}
                contentLabel="Add Quiz"
                style={styles.modalStyles}
            >
                <h2 style={styles.headingStyles}>Dodaj Quiz</h2>
                <h3 style={styles.headingStyles2}>Uzupełnij dane o quizie:</h3>
                <AddQuiz/>
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
                isOpen={deleteConfirmationModalIsOpen}
                onRequestClose={() => setDeleteConfirmationModalIsOpen(false)}
                contentLabel="Delete Confirmation"
                style={styles.smallModalStyles}
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
                isOpen={editModalIsOpen}
                onRequestClose={closeEditQuizModal}
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
                    onClick={closeEditQuizModal}
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
