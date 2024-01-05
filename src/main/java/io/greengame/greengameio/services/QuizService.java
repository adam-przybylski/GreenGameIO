package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.exceptions.quiz.QuizNotFoundException;
import io.greengame.greengameio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;

    // Create

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // Read

    public Quiz getQuiz(Long quizID) throws QuizNotFoundException {
        return quizRepository.findById(quizID).orElseThrow(() -> new QuizNotFoundException("Quiz with given ID could not be found in the database."));
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizByQuizTitle(String quizTitle) throws QuizNotFoundException {
        Quiz quiz = quizRepository.getQuizByQuizTitle(quizTitle);
        if (quiz == null) {
            throw new QuizNotFoundException("Quiz with given title could not be found in the database.");
        }
        return quiz;
    }

    // Update

    public void updateQuiz(Quiz quiz) {
        quizRepository.save(quiz);
    }

    // Delete

    public void deleteQuizByQuizId(Long quizId) {
        quizRepository.deleteQuizByQuizID(quizId);
    }
}
