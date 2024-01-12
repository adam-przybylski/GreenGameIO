import React, {useState} from 'react';

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
        console.log(data)
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
        console.log(formFieldsQuiz[0].quizOpenDate)
        postNewQuiz(newQuiz)
        setAddModalIsOpen(false)

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
                                //defaultValue={form.quizOpenDate}
                                key={`quizOpenDate-${index}`}
                                //value={form.quizOpenDate}
                                //key={form.quizOpenDate}
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

export default AddQuizModal;