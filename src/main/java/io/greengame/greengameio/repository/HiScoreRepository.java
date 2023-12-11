package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.HiScore;
import io.greengame.greengameio.entity.Quiz;
import io.greengame.greengameio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HiScoreRepository extends JpaRepository<HiScore, Long> {

    public HiScore getHiScoreByUserAndQuiz(User user, Quiz quiz);

    public List<HiScore> getHiScoresByUser(User user);
    public List<HiScore> getHiScoresByQuiz(Quiz quiz);

    public void deleteAllByUser(User user);
    public void deleteAllByQuiz(Quiz quiz);
}
