package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;

    // Create

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // Read

    public Quiz getQuiz(Long quizID) {
        return quizRepository.findById(quizID).orElseThrow(() -> new RuntimeException("Quiz with given ID could not be found in the database."));
    }

    public Quiz getQuizByQuizTitle(String quizTitle) {
        return quizRepository.getQuizByQuizTitle(quizTitle);
    }

    // Update

    public void updateQuiz(Quiz quiz) {
        Quiz quizFromDatabase = quizRepository.findById(quiz.getQuizID()).orElseThrow(() -> new RuntimeException("Quiz with given ID could not be found in the database."));
        quizRepository.delete(quizFromDatabase);
        quizRepository.save(quiz);
    }

    // Delete

    public void deleteQuiz(Quiz quiz) {
        quizRepository.delete(quiz);
    }
}
