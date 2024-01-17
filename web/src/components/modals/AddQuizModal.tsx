import React, {useState} from 'react';
import * as styles from "../../pages/admin/quizzesAdmin/styles.ts";

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

interface AddQuizProps {
    postNewQuiz: (newQuiz: Quiz) => void;
    setAddModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddQuizModal: React.FC<AddQuizProps> = ({postNewQuiz, setAddModalIsOpen}) => {
    const [formFieldsQuiz, setFormFieldsQuiz] = useState([
        {quizTitle: "", quizCreator: "", quizOpenDate: new Date()},
    ]);

    const [formFieldsQuestion, setFormFieldsQuestion] = useState([
        {questionContent: "", questionAnswers: [{answerContent: "", correct: false}]},
    ]);

    const handleQuizFormChange = (event, index) => {
        let data = [...formFieldsQuiz];
        if (event.target.type === "datetime-local") {
            data[index].quizOpenDate = event.target.value;
        } else {
            data[index][event.target.name] = event.target.value;
        }
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

            if (event.target.checked) {
                data[questionIndex].questionAnswers.forEach((answer, index) => {
                    if (index !== answerIndex) {
                        answer.correct = false;
                    }
                });
            }
        } else {
            data[questionIndex].questionAnswers[answerIndex][event.target.name] = event.target.value;
        }
        setFormFieldsQuestion(data);
    };

    const submit = (e) => {
        e.preventDefault();

        if (formFieldsQuiz[0].quizTitle.trim() === '') {
            const errorMessage = 'Quiz musi mieć zdefiniowaną nazwę.';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        if (formFieldsQuiz[0].quizCreator.trim() === '') {
            const errorMessage = 'Quiz musi mieć zdefiniowanego twórcę.';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        if (!formFieldsQuiz[0].quizOpenDate) {
            const errorMessage = 'Quiz musi mieć zdefiniowaną datę otwarcia.';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        if (formFieldsQuestion.length === 0 || formFieldsQuestion.length > 10) {
            const errorMessage = 'Quiz musi składać się przynajmniej z 1 pytania.';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        for (const question of formFieldsQuestion) {
            if (
                question.questionContent.trim() === '' ||
                question.questionAnswers.length < 2 ||
                question.questionAnswers.length > 5 ||
                !question.questionAnswers.some(answer => answer.correct)
            ) {
                const errorMessage = 'Żadne pytanie nie może mieć mniej niż 2 odpowiedzi';
                console.error(errorMessage);
                alert(errorMessage);
                return;
            }
        }

        const newQuiz: Quiz = {
            quizID: 0,
            quizTitle: formFieldsQuiz[0].quizTitle,
            quizCreatorName: formFieldsQuiz[0].quizCreator,
            quizOpenDate: formFieldsQuiz[0].quizOpenDate,
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

    const addQuestion = (e) => {
        e.preventDefault();

        if (formFieldsQuestion.length >= 10) {
            const errorMessage = 'Quiz nie może mieć więcej niż 10 pytań.';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        let object = {
            questionContent: "",
            questionAnswers: [{answerContent: "", correct: false}],
        };
        setFormFieldsQuestion([...formFieldsQuestion, object]);
    };

    const addAnswer = (questionIndex) => {
        let data = [...formFieldsQuestion];
        if (data[questionIndex].questionAnswers.length >= 5) {
            const errorMessage = 'Pytanie może mieć więcej niż 5 odpowiedzi';
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }
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
                            <strong>Nazwa Quizu: </strong><br/>
                            <input
                                name="quizTitle"
                                placeholder="..."
                                onChange={(event) => handleQuizFormChange(event, index)}
                                value={form.quizTitle}
                                required={true}
                                style={{width: '45%'}}
                            />
                            <br/><br/>
                            <strong>Twórca Quizu: </strong><br/>
                            <input
                                name="quizCreator"
                                placeholder="..."
                                onChange={(event) => handleQuizFormChange(event, index)}
                                value={form.quizCreator}
                                required={true}
                                style={{width: '25%'}}
                            />
                            <br/><br/>
                            <strong>Data Otwarcia Quizu: </strong><br/>
                            <input
                                type="datetime-local"
                                onChange={(event) => handleQuizFormChange(event, index)}
                                //defaultValue={form.quizOpenDate}
                                key={`quizOpenDate-${index}`}
                                //value={form.quizOpenDate}
                                //key={form.quizOpenDate}
                                required={true}
                            />
                            <h3 style={styles.headingStyles2}>Lista pytań:</h3>
                        </div>
                    );
                })}
            </form>
            <br/>
            <form>
                {formFieldsQuestion.map((form, questionIndex) => {
                    return (
                        <div key={questionIndex}>
                            <br/>
                            <strong style={{fontSize: "1.2em"}}>Pytanie {questionIndex + 1} </strong>
                            <button
                                type="button"
                                onClick={() => removeQuestion(questionIndex)}
                                style={{border: 'none', background: 'none', cursor: 'pointer'}}
                            >
                                <span style={{fontSize: '1.1em'}}>&#10006;</span>
                            </button>
                            <br/>
                            <input
                                name="questionContent"
                                placeholder="Treść pytania"
                                onChange={(event) => handleQuestionFormChange(event, questionIndex)}
                                value={form.questionContent}
                                style={{width: '45%'}}
                            />
                            <br/>
                            <br/>
                            {form.questionAnswers.map((answer, answerIndex) => (
                                <div key={answerIndex}>
                                    <strong>Odpowiedź {answerIndex + 1}  </strong>
                                    <button
                                        type="button"
                                        onClick={() => removeAnswer(questionIndex, answerIndex)}
                                        style={{border: 'none', background: 'none', cursor: 'pointer'}}
                                    >
                                        <span style={{fontSize: '1em'}}>&#10006;</span>
                                    </button>
                                    <br/>
                                    <input
                                        name="answerContent"
                                        placeholder="Treść odpowiedzi"
                                        onChange={(event) => handleAnswerFormChange(event, questionIndex, answerIndex)}
                                        value={answer.answerContent}
                                        style={{width: '25%'}}
                                    />
                                    <input
                                        type="checkbox"
                                        name="correct"
                                        label="Czy poprawne?"
                                        onChange={(event) => handleAnswerFormChange(event, questionIndex, answerIndex)}
                                        checked={answer.correct}
                                    />
                                    <br/>
                                    <br/>
                                </div>
                            ))}
                            <button type="button" onClick={() => addAnswer(questionIndex)}>
                                <strong>Dodaj odpowiedź</strong>
                            </button>
                            <br/>
                            <br/>
                        </div>
                    );
                })}
            </form>
            <button onClick={addQuestion}>
                <strong style={{color: "black", fontSize: "1.1em"}}>Dodaj pytanie</strong>
            </button>
            <br/>
            <br/>
            <button
                style={{
                    ...styles.buttonStyles,
                    bottom: '20px',
                    left: '50%',
                    backgroundColor: "red"
                }}
                onClick={submit}
            >
                <strong>Zapisz Quiz</strong>
            </button>
            <br/>
            <br/>
            <button
                style={{
                    ...styles.buttonStyles,
                    bottom: '20px',
                    left: '50%',
                }}
                onClick={() => setAddModalIsOpen(false)}
            >
                <strong>Anuluj</strong>
            </button>
        </div>
    );
}

export default AddQuizModal;