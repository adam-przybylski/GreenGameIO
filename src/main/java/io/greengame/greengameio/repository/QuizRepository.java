package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    public Optional<Quiz> getQuizByQuizTitle(String quizTitle);
    public void deleteQuizByQuizID(Long quizId);
}
