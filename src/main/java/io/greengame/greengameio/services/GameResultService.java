package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.repository.GameResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameResultService {

    private final GameResultRepository gameResultRepository;

    public GameResult createGameResult(GameResult gameResult) {
        return gameResultRepository.save(gameResult);
    }

    public int getXpByUserId(Long userId) {
        return gameResultRepository.findXpByUserId(userId);
    }

    public GameResult updateGameResult(Long userId, GameResult gameResult) {
        GameResult gameResult1 = gameResultRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("GameResult not found."));
        gameResult1.setUserId(gameResult.getUserId());
        gameResult1.setSnakeScore(gameResult.getSnakeScore());
        gameResult1.setLightsOutScore(gameResult.getLightsOutScore());
        gameResult1.setXp(gameResult.getXp());
        return gameResultRepository.save(gameResult1);
    }


}
