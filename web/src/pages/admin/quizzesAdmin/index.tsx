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
            {quizTitle: '', quizCreator: '', quizOpenDate: new Date()},
        ])
        const [formFieldsQuestion, setFormFieldsQuestion] = useState([
            {questionContent: '', questionAnswers: []},
        ])

        const [formFieldsAnswer, setFormFieldsAnswer] = useState([
            {answerContent: '', correct: false,},
        ])
        const handleQuizFormChange = (event, index) => {
            let data = [...formFieldsQuiz];
            data[index][event.target.name] = event.target.value;
            setFormFieldsQuiz(data);
        }
        const handleQuestionFormChange = (event, index) => {
            let data = [...formFieldsQuestion];
            data[index][event.target.name] = event.target.value;
            setFormFieldsQuestion(data);
        }
        const handleAnswerFormChange = (event, index) => {
            let data = [...formFieldsAnswer];
            data[index][event.target.name] = event.target.value;
            setFormFieldsAnswer(data);
            if (event.target.type === 'checkbox') {
                data[index][event.target.name] = event.target.checked;
            } else {
                data[index][event.target.name] = event.target.value;
            }
        }

        const submit = (e) => {
            e.preventDefault();
            console.log(formFieldsQuiz)
            console.log(formFieldsQuestion)
            console.log(formFieldsAnswer)

            const newQuiz: Quiz = {
                quizID: 0,
                quizTitle: formFieldsQuiz[0].quizTitle,
                quizCreatorName: formFieldsQuiz[0].quizCreator,
                quizOpenDate: new Date(formFieldsQuiz[0].quizOpenDate),
                listOfQuestions: formFieldsQuestion.map((question, index) => {
                    return {
                        questionContent: question.questionContent,
                        listOfAnswers: formFieldsAnswer
                            .filter((answer) => answer.index === index)
                            .map((answer) => ({
                                answerContent: answer.answerContent,
                                correct: answer.correct,
                            })),
                    };
                }),
            };
            console.log(newQuiz)
        }

        const addQuestion = (e) => {
            e.preventDefault();
            let object = {
                questionContent: '',
                questionAnswers: [],
            }

            setFormFieldsQuestion([...formFieldsQuestion, object])
        }
        const addAnswer = (e) => {
            e.preventDefault();
            let object = {
                answerContent: '',
                correct: false,
            }
            setFormFieldsAnswer([...formFieldsAnswer, object])
        }

        const removeQuestion = (index) => {
            let data = [...formFieldsQuestion];
            data.splice(index, 1)
            setFormFieldsQuestion(data)
        }
        const removeAnswer = (index) => {
            let data = [...formFieldsAnswer];
            data.splice(index, 1)
            setFormFieldsAnswer(data)
        }

        return (
            <div className="AddQuiz">
                <form>
                    {formFieldsQuiz.map((form, index) => {
                        return (
                            <div key={index}>
                                <input
                                    name='quizTitle'
                                    placeholder='Treść pytania'
                                    onChange={event => handleQuizFormChange(event, index)}
                                    value={form.quizTitle}
                                />
                                <br/>
                                <input
                                    name='quizCreator'
                                    placeholder='Twórca Quizu'
                                    onChange={event => handleQuizFormChange(event, index)}
                                    value={form.quizCreator}
                                />
                                <br/>
                                <input
                                    type="datetime-local"
                                    onChange={event => handleQuizFormChange(event, index)}
                                    defaultValue={form.quizOpenDate.toISOString().slice(0, 16)}
                                    key={`quizOpenDate-${index}`}
                                />
                            </div>
                        )
                    })}
                </form>
                <br/><br/>
                <form>
                    {formFieldsQuestion.map((form, index) => {
                        return (
                            <div key={index}>
                                <input
                                    name='questionContent'
                                    placeholder='Treść Odpowiedzi'
                                    onChange={event => handleQuestionFormChange(event, index)}
                                    value={form.questionContent}
                                />
                                <br/>
                                <button onClick={() => removeQuestion(index)}>Remove Question</button>
                            </div>
                        )
                    })}
                    {formFieldsAnswer.map((form, index) => {
                        return (
                            <>
                                <div key={index}>
                                    <input
                                        name='answerContent'
                                        placeholder='Treść Pytania'
                                        onChange={event => handleAnswerFormChange(event, index)}
                                        value={form.answerContent}/>
                                    <input
                                        type='checkbox'
                                        name='correct'
                                        label='Czy poprawne?'
                                        onChange={event => handleAnswerFormChange(event, index)}
                                        checked={form.correct}
                                    />
                                    <button type="button" onClick={() => removeAnswer(index)}>Remove Answer</button>
                                    <br/>

                                </div>
                                <button type="button" onClick={addAnswer}>Add an Answer</button>
                            </>
                        )
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
                <AddQuiz></AddQuiz>
                <form>
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
                </form>
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
                                    margin: '10px', // Add margin for spacing
                                }}
                                onClick={confirmDeleteQuiz}
                            >
                                Tak, usuń
                            </button>
                            <button
                                style={{
                                    ...styles.buttonStyles,
                                    marginLeft: '10px',
                                    margin: '10px', // Add margin for spacing
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
