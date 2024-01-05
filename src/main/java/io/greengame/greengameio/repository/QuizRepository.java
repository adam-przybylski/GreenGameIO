package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    public Quiz getQuizByQuizTitle(String quizTitle);
    public void deleteQuizByQuizID(Long quizId);
}
