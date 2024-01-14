package io.greengame.greengameio.controller;

import io.greengame.greengameio.dtos.quizzes.input_dtos.QuestionAnswersDTO;
import io.greengame.greengameio.dtos.quizzes.input_dtos.QuestionInputDTO;
import io.greengame.greengameio.dtos.quizzes.input_dtos.QuizCheckDTO;
import io.greengame.greengameio.dtos.quizzes.input_dtos.QuizInputDTO;
import io.greengame.greengameio.dtos.quizzes.mappers.HiScoreMapper;
import io.greengame.greengameio.dtos.quizzes.mappers.QuestionMapper;
import io.greengame.greengameio.dtos.quizzes.mappers.QuizMapper;
import io.greengame.greengameio.dtos.quizzes.modification_dtos.QuizGeneralInfoModificationDTO;
import io.greengame.greengameio.dtos.quizzes.modification_dtos.QuizQuestionModificationDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuizOutputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuizWithCorrectAnswersDTO;
import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.exceptions.hiScore.HiScoreNotFoundException;
import io.greengame.greengameio.exceptions.quiz.QuizNotFoundException;
import io.greengame.greengameio.services.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
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

    // Create methods

    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody QuizInputDTO quizInputDTO) {
        Quiz newQuiz = QuizMapper.toQuiz(quizInputDTO);
        for (Question question : newQuiz.getListOfQuestions()) {
            for (Answer answer : question.getListOfAnswers()) {
                answerService.createAnswer(answer);
            }
            questionService.createQuestion(question);
        }
        quizService.createQuiz(newQuiz);
        return ResponseEntity.created(URI.create("http://localhost:8081/api/v1/quizzes/" + newQuiz.getQuizID())).contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(newQuiz));
    }

    // Read methods

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getQuizByID(@PathVariable Long id) {
        Quiz quiz = null;
        try {
            quiz = quizService.getQuiz(id);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(quiz));
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/id/{id}/correct")
    public ResponseEntity<?> getQuizWithCorrectAnswersByID(@PathVariable Long id) {
        Quiz quiz = null;
        try {
            quiz = quizService.getQuiz(id);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizWithCorrectAnswersDTO(quiz));
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<?> getQuizByTitle(@PathVariable String title) {
        try {
            Quiz quiz = quizService.getQuizByQuizTitle(title);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(quiz));
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllQuizzes() {
        List<Quiz> listOfAllQuizzes = quizService.getAllQuizzes();
        List<QuizOutputDTO> listOfQuizOutputDTOs = new ArrayList<>();
        for (Quiz quiz : listOfAllQuizzes) {
            listOfQuizOutputDTOs.add(QuizMapper.toQuizOutputDTO(quiz));
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(listOfQuizOutputDTOs);
    }

    @GetMapping("/correct")
    public ResponseEntity<?> getAllQuizzesWithCorrectAnswersByID() {
        List<Quiz> listOfAllQuizzes = quizService.getAllQuizzes();
        List<QuizWithCorrectAnswersDTO> listOfQuizOutputDTOs = new ArrayList<>();
        for (Quiz quiz : listOfAllQuizzes) {
            listOfQuizOutputDTOs.add(QuizMapper.toQuizWithCorrectAnswersDTO(quiz));
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(listOfQuizOutputDTOs);
    }

    @GetMapping("/id/{quizID}/user-id/{userID}")
    public ResponseEntity<?> getHiScoreForUserInCertainQuiz(@PathVariable Long userID, @PathVariable Long quizID) {
        try {
            User user = userService.getUserById(userID);
            Quiz quiz = quizService.getQuiz(quizID);
            HiScore hiScore;
            try {
                hiScore = hiScoreService.getHighScoreByUserAndQuiz(user, quiz);
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(hiScore.getHiScore());
            } catch (HiScoreNotFoundException exception) {
                return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
            }
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
        }
    }

    // Update methods

    @PutMapping("/id/{quizID}/modify-general")
    public ResponseEntity<?> modifyQuizGeneralInfo(@PathVariable Long quizID, @RequestBody QuizGeneralInfoModificationDTO quizGeneralInfoModificationDTO) {
        try {
            Quiz existingQuiz = quizService.getQuiz(quizID);
            existingQuiz.setQuizTitle(quizGeneralInfoModificationDTO.getQuizTitle());
            existingQuiz.setQuizOpenDate(quizGeneralInfoModificationDTO.getQuizOpenDate());
            quizService.updateQuiz(existingQuiz);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(existingQuiz));
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
        }
    }

    @PutMapping("/id/{quizID}/modify-questions")
    @Transactional
    public ResponseEntity<?> modifyQuizQuestions(@PathVariable Long quizID, @RequestBody QuizQuestionModificationDTO quizQuestionModificationDTO) {
        try {
            Quiz existingQuiz = quizService.getQuiz(quizID);

            for (Question question : existingQuiz.getListOfQuestions()) {
                for (Answer answer : question.getListOfAnswers()) {
                    answerService.deleteAnswer(answer);
                }
                questionService.deleteQuestion(question);
            }

            List<Question> newListOfQuestions = new ArrayList<>();
            List<QuestionInputDTO> questionInputDTOs = quizQuestionModificationDTO.getListOfQuestions();
            for (int i = 0; i < questionInputDTOs.size(); i++) {
                Question newQuestion = QuestionMapper.toQuestion(questionInputDTOs.get(i), i + 1);
                for (Answer answer : newQuestion.getListOfAnswers()) {
                    answerService.createAnswer(answer);
                }
                questionService.createQuestion(newQuestion);
                newListOfQuestions.add(newQuestion);
            }

            existingQuiz.setListOfQuestions(newListOfQuestions);
            quizService.updateQuiz(existingQuiz);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(existingQuiz));
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
        }
    }

    // Delete methods

    @DeleteMapping("/id/{quizID}")
    @Transactional
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizID) {
        try {
            Quiz quizToBeDeleted = quizService.getQuiz(quizID);
            hiScoreService.deleteAllHiScoresByQuizId(quizID);
            List<Question> listOfQuestionToBeDeleted = quizToBeDeleted.getListOfQuestions();
            quizService.deleteQuizByQuizId(quizID);
            for (Question question : listOfQuestionToBeDeleted) {
                List<Answer> listOfAnswersToBeDeleted = question.getListOfAnswers();
                questionService.deleteQuestion(question);
                for (Answer answer : listOfAnswersToBeDeleted){
                    answerService.deleteAnswer(answer);
                }
            }

            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Quiz was deleted successfully.");
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
        }
    }

    // Other methods

    @PostMapping("/id/{quizID}/check")
    @Transactional
    public ResponseEntity<?> checkQuiz(@PathVariable Long quizID, @RequestBody QuizCheckDTO quizCheckDTO) {
        try {
            Quiz quizFromDB = quizService.getQuiz(quizID);
            int numberOfCorrectAnswers = 0;

            for (QuestionAnswersDTO questionAnswersDTO : quizCheckDTO.getListOfUserAnswers()) {
                int answerNumber = questionAnswersDTO.getAnswerNumber() - 1;
                if (answerNumber >= 0) {
                    Answer answer = quizFromDB.getCertainQuestion(questionAnswersDTO.getQuestionNumber() - 1).getCertainAnswer(questionAnswersDTO.getAnswerNumber() - 1);
                    if (answer.isCorrect()) {
                        numberOfCorrectAnswers++;
                    }
                }
            }

            User user = userService.getUserById(quizCheckDTO.getUserID());
            Quiz quiz = quizService.getQuiz(quizID);

            HiScore hiScore;
            HiScore newHiScore;
            try {
                hiScore = hiScoreService.getHighScoreByUserAndQuiz(user, quiz);
                if (hiScore.getHiScore() < numberOfCorrectAnswers) {
                    hiScore.setHiScore(numberOfCorrectAnswers);
                    hiScoreService.updateHiScore(hiScore);
                }
                newHiScore = hiScoreService.getHighScoreByUserAndQuiz(user, quiz);
            } catch (HiScoreNotFoundException exception) {
                newHiScore = new HiScore(quiz, user, numberOfCorrectAnswers);
                hiScoreService.createHiScore(newHiScore);
            }

            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(HiScoreMapper.toHiScoreOutputDTO(newHiScore, numberOfCorrectAnswers));
        } catch (QuizNotFoundException exception) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(exception.getMessage());
        }
    }
}
