package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;

    // Create

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // Read

    public Optional<Quiz> getQuiz(Long quizID) {
        return quizRepository.findById(quizID);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizByQuizTitle(String quizTitle) {
        return quizRepository.getQuizByQuizTitle(quizTitle);
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
