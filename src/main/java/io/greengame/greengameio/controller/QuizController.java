package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final HiScoreService hiScoreService;

    private final UserService userService;

    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        Quiz newQuiz = quizService.createQuiz(quiz);

        for (Question question : quiz.getListOfQuestions()) {
            questionService.createQuestion(question);

            for (Answer answer : question.getQuestionAnswers()) {
                answerService.createAnswer(answer);
            }
        }

        return newQuiz;
    }

    @GetMapping("/id/{id}")
    public Quiz getQuizByID(@PathVariable Long id) {
        return quizService.getQuiz(id);
    }

    @GetMapping("/title/{quizTitle}")
    public Quiz getQuizByTitle(@PathVariable String quizTitle) {
        return quizService.getQuizByQuizTitle(quizTitle);
    }

    @PostMapping("/id/{quizID}/modify")
    public void modifyQuiz(@PathVariable Long quizID, @RequestBody Quiz quiz) {
        quiz.setQuizID(quizID);
        quizService.updateQuiz(quiz);
    }

    @DeleteMapping("/id/{quizID}")
    public void deleteQuiz(@PathVariable Long quizID) {
        quizService.deleteQuiz(quizService.getQuiz(quizID));
    }

    @GetMapping("/id/{quizID}/user-id/{userID}")
    public HiScore getHiScoreForUserInCertainQuiz(@PathVariable Long userID, @PathVariable Long quizID) {
        User user = userService.getUserById(userID);
        Quiz quiz = quizService.getQuiz(quizID);
        return hiScoreService.getHighScoreByUserAndQuiz(user, quiz);
    }

    @GetMapping("/id/{quizID}/check")
    public int checkQuiz(@PathVariable Long quizID, @RequestBody Quiz quiz) {
        Quiz quizFromDB = quizService.getQuiz(quizID);
        int numberOfCorrectAnswers = 0;
        for (int i = 0; i < quizFromDB.getListOfQuestions().size(); i++) {
            if (quizFromDB.getListOfQuestions().get(i).getCorrectAnswer()
                    .equals(quiz.getListOfQuestions().get(i).getCorrectAnswer())) {
                numberOfCorrectAnswers++;
            }
        }
        return numberOfCorrectAnswers;
    }

    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }
}
