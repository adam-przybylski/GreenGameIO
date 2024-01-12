import React, {FC, useState} from 'react';
import * as styles from './styles.ts'

interface Answer {
    answerContent: string;
    correct: boolean;
}

interface Question {
    questionNumber: number;
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


interface EditQuizProps {
    selectedQuiz: Quiz | null,
    isOpen: boolean,
    onClose: () => void,
    onUpdateQuiz: (updatedQuiz: {
        quizCreatorName: string;
        quizID: number | undefined;
        quizOpenDate: Date;
        listOfQuestions: {
            questionContent: string;
            listOfAnswers: { answerContent: string; correct: boolean }[];
            questionNumber: any
        }[];
        quizTitle: string
    }) => void,
    postUpdatedQuiz: (newQuiz: Quiz) => void;
    setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditQuizModal: FC<EditQuizProps> = ({selectedQuiz, setEditModalIsOpen, onUpdateQuiz, postUpdatedQuiz}) => {
    const [formFieldsQuiz, setFormFieldsQuiz] = useState([
        {
            quizTitle: selectedQuiz?.quizTitle,
            quizCreator: selectedQuiz?.quizCreatorName,
            quizOpenDate: selectedQuiz?.quizOpenDate,
        },
    ]);

    console.log("EDIT QUIZ")
    console.table(selectedQuiz)
    console.table(formFieldsQuiz)

    const [formFieldsQuestion, setFormFieldsQuestion] = useState(
        selectedQuiz?.listOfQuestions.map((question) => {
            return {
                questionContent: question.questionContent,
                questionNumber: question.questionNumber,
                questionAnswers: question.listOfAnswers.map((answer) => {
                    return {
                        answerContent: answer.answerContent,
                        correct: answer.correct,
                    };
                }),
            };
        }) || [
            {questionContent: "", questionAnswers: [{answerContent: "", correct: false}]},
        ]
    );

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
            data[questionIndex].questionAnswers[answerIndex][event.target.name] =
                event.target.checked;
        } else {
            data[questionIndex].questionAnswers[answerIndex][event.target.name] =
                event.target.value;
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
        console.log(formFieldsQuiz[0].quizOpenDate.toString())

        const updatedQuiz = {
            quizID: selectedQuiz?.quizID,
            quizTitle: formFieldsQuiz[0].quizTitle,
            quizCreatorName: formFieldsQuiz[0].quizCreator,
            quizOpenDate: new Date(formFieldsQuiz[0].quizOpenDate),
            listOfQuestions: formFieldsQuestion.map((question) => {
                return {
                    questionContent: question.questionContent,
                    questionNumber: question.questionNumber,
                    listOfAnswers: question.questionAnswers.map((answer) => {
                        return {
                            answerContent: answer.answerContent,
                            correct: answer.correct,
                        };
                    }),
                };
            }),
        };
        onUpdateQuiz(updatedQuiz)
        postUpdatedQuiz(updatedQuiz)
        setEditModalIsOpen(false)
    };

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

        <div>
            <form>
                {formFieldsQuiz.map((form, index) => {
                    // @ts-ignore
                    // @ts-ignore
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
                            <br/>
                            <input
                                type="datetime-local"
                                onChange={(event) => handleQuizFormChange(event, index)}
                                defaultValue={form.quizOpenDate}
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
                        <div key={questionIndex} style={{marginBottom: '10px'}}>
                            <input
                                style={{width: '80%', padding: '4px'}}
                                name="questionContent"
                                placeholder="Treść Pytania"
                                onChange={(event) => handleQuestionFormChange(event, questionIndex)}
                                value={form.questionContent}
                            />
                            <br/>
                            {form.questionAnswers.map((answer, answerIndex) => (
                                <div key={answerIndex} style={{marginBottom: '5px'}}>
                                    <input
                                        style={{width: '60%', padding: '4px'}}
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
                                    <button type="button"
                                            onClick={() => removeAnswer(questionIndex, answerIndex)}>
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

export default EditQuizModal;