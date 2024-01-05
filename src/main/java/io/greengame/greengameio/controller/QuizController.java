package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.exceptions.quiz.QuizNotFoundException;
import io.greengame.greengameio.services.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@Validated
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
@Transactional
public class QuizController {

    private final QuizService quizService;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final HiScoreService hiScoreService;

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody Quiz quiz) {
        for (Question question : quiz.getListOfQuestions()) {
            for (Answer answer : question.getQuestionAnswers()) {
                answerService.createAnswer(answer);
            }
            questionService.createQuestion(question);
        }
        Quiz newQuiz = quizService.createQuiz(quiz);
        return ResponseEntity.created(URI.create("http://localhost:8081/api/v1/quizzes/" + newQuiz.getQuizID())).contentType(MediaType.APPLICATION_JSON).body(newQuiz);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getQuizByID(@PathVariable Long id) {
        Quiz quiz = null;
        try {
            quiz = quizService.getQuiz(id);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(quiz);
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/title/{title}")
    public ResponseEntity<?> getQuizByTitle(@PathVariable String title) {
        try {
            Quiz quiz = quizService.getQuizByQuizTitle(title);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(quiz);
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/id/{quizID}/modify")
    public ResponseEntity<?> modifyQuiz(@PathVariable Long quizID, @RequestBody Quiz quiz) {
        quiz.setQuizID(quizID);
        quizService.updateQuiz(quiz);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id/{quizID}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizID) {
        hiScoreService.deleteAllHiScoresByQuizId(quizID);
        quizService.deleteQuizByQuizId(quizID);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/id/{quizID}/user-id/{userID}")
    public ResponseEntity<?> getHiScoreForUserInCertainQuiz(@PathVariable Long userID, @PathVariable Long quizID) {
        try {
            User user = userService.getUserById(userID);
            Quiz quiz = quizService.getQuiz(quizID);
            HiScore hiScore = hiScoreService.getHighScoreByUserAndQuiz(user, quiz);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(hiScore.getHiScore());
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
        }
    }

    @PostMapping("/id/{quizID}/check")
    public ResponseEntity<?> checkQuiz(@PathVariable Long quizID, @RequestBody Quiz quiz) {
        try {
            Quiz quizFromDB = quizService.getQuiz(quizID);
            int numberOfCorrectAnswers = 0;
            for (int i = 0; i < quizFromDB.getListOfQuestions().size(); i++) {
                if (quizFromDB.getListOfQuestions().get(i).getCorrectAnswer()
                        .equals(quiz.getListOfQuestions().get(i).getCorrectAnswer())) {
                    numberOfCorrectAnswers++;
                }
            }
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(numberOfCorrectAnswers);
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllQuizzes() {
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(quizService.getAllQuizzes());
    }
}
