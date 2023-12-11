package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameResultRepository extends JpaRepository<GameResult, Long> {

    @Query("SELECT gr.xp FROM GameResult gr WHERE gr.userId = ?1")
    double findXpByUserId(Long userId);
    int findSnakeScoreByUserId(Long userId);
    int findLightOutScoreByUserId(Long userId);
    Optional<GameResult> findByUserId(Long userId);


}
