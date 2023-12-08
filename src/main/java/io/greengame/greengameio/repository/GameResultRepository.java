package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameResultRepository extends JpaRepository<GameResult, Long> {

    int findXpByUserId(Long userId);

    Optional<GameResult> findByUserId(Long userId);


}
