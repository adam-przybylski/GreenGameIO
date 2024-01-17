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
import java.util.Optional;

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
        Optional<Quiz> quiz = quizService.getQuiz(id);
        return quiz
                .map(value -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(value)))
                .orElseGet(() -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(null));
    }

    @GetMapping("/id/{id}/correct")
    public ResponseEntity<?> getQuizWithCorrectAnswersByID(@PathVariable Long id) {
        Optional<Quiz> quiz = quizService.getQuiz(id);
        return quiz
                .map(value -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizWithCorrectAnswersDTO(value)))
                .orElseGet(() -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(null));
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<?> getQuizByTitle(@PathVariable String title) {
        Optional<Quiz> quiz = quizService.getQuizByQuizTitle(title);
        return quiz
                .map(value -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(value)))
                .orElseGet(() -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(null));
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
        User user = userService.getUserById(userID);
        Optional<Quiz> quiz = quizService.getQuiz(quizID);
        if (quiz.isPresent()) {
            Optional<HiScore> hiScore = hiScoreService.getHighScoreByUserAndQuiz(user, quiz.get());
            if (hiScore.isPresent()) {
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(hiScore.get().getHiScore());
            }
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("No high score for given user was found.");
    }

    // Update methods

    @PutMapping("/id/{quizID}/modify-general")
    public ResponseEntity<?> modifyQuizGeneralInfo(@PathVariable Long quizID, @RequestBody QuizGeneralInfoModificationDTO quizGeneralInfoModificationDTO) {
        Optional<Quiz> existingQuizOpt = quizService.getQuiz(quizID);
        if (existingQuizOpt.isPresent()) {
            Quiz existingQuiz = existingQuizOpt.get();
            existingQuiz.setQuizTitle(quizGeneralInfoModificationDTO.getQuizTitle());
            existingQuiz.setQuizOpenDate(quizGeneralInfoModificationDTO.getQuizOpenDate());
            quizService.updateQuiz(existingQuiz);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(QuizMapper.toQuizOutputDTO(existingQuiz));
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Quiz general information could not be modified.");
        }
    }

    @PutMapping("/id/{quizID}/modify-questions")
    @Transactional
    public ResponseEntity<?> modifyQuizQuestions(@PathVariable Long quizID, @RequestBody QuizQuestionModificationDTO quizQuestionModificationDTO) {
        Optional<Quiz> existingQuizOpt = quizService.getQuiz(quizID);
        if (existingQuizOpt.isPresent()) {
            Quiz existingQuiz = existingQuizOpt.get();
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
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Quiz questions could not be updated.");
        }
    }

    // Delete methods

    @DeleteMapping("/id/{quizID}")
    @Transactional
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizID) {
        Optional<Quiz> quizToBeDeletedOpt = quizService.getQuiz(quizID);
        if (quizToBeDeletedOpt.isPresent()) {
            Quiz quizToBeDeleted = quizToBeDeletedOpt.get();
            hiScoreService.deleteAllHiScoresByQuizId(quizID);
            List<Question> listOfQuestionToBeDeleted = quizToBeDeleted.getListOfQuestions();
            quizService.deleteQuizByQuizId(quizID);
            for (Question question : listOfQuestionToBeDeleted) {
                List<Answer> listOfAnswersToBeDeleted = question.getListOfAnswers();
                questionService.deleteQuestion(question);
                for (Answer answer : listOfAnswersToBeDeleted) {
                    answerService.deleteAnswer(answer);
                }
            }
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Quiz was deleted successfully.");
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Quiz could not be updated since it does not exist.");
        }
    }

    // Other methods

    @PostMapping("/id/{quizID}/check")
    @Transactional
    public ResponseEntity<?> checkQuiz(@PathVariable Long quizID, @RequestBody QuizCheckDTO quizCheckDTO) {
        Optional<Quiz> quizFromDBOpt = quizService.getQuiz(quizID);
        if (quizFromDBOpt.isPresent()) {
            Quiz quizFromDB = quizFromDBOpt.get();
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
            Optional<Quiz> quizOpt = quizService.getQuiz(quizID);

            if (quizOpt.isPresent()) {
                Quiz quiz = quizOpt.get();

                HiScore hiScore;
                Optional<HiScore> newHiScoreOpt;

                Optional<HiScore> hiScoreOpt = hiScoreService.getHighScoreByUserAndQuiz(user, quiz);
                if (hiScoreOpt.isPresent() && hiScoreOpt.get().getHiScore() < numberOfCorrectAnswers) {
                    hiScore = hiScoreOpt.get();
                    hiScore.setHiScore(numberOfCorrectAnswers);
                    hiScoreService.updateHiScore(hiScore);
                } else {
                    hiScore = new HiScore(quiz, user, numberOfCorrectAnswers);
                    hiScoreService.createHiScore(hiScore);
                }

                newHiScoreOpt = hiScoreService.getHighScoreByUserAndQuiz(user, quiz);
                if (newHiScoreOpt.isPresent()) {
                    return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(HiScoreMapper.toHiScoreOutputDTO(newHiScoreOpt.get(), numberOfCorrectAnswers));
                }
            }
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(0);
    }
}
