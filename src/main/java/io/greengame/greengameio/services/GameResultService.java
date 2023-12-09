package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.repository.GameResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameResultService {

    private final GameResultRepository gameResultRepository;

    public GameResult createGameResult(GameResult gameResult) {
        return gameResultRepository.save(gameResult);
    }

    public double  getXpByUserId(Long userId) {
        return gameResultRepository.findXpByUserId(userId);
    }

    public void updateUserXP(Long userId,float xp) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findById(userId);
        if (optionalGameResult.isPresent()) {
            GameResult gameResult = optionalGameResult.get();
            double previousXp = optionalGameResult.get().getXp();
            double actualXp = previousXp + xp;
            optionalGameResult.get().setXp(actualXp);
            gameResultRepository.save(optionalGameResult.get());
        } else {
            GameResult newGameResult = new GameResult();
            newGameResult.setId(userId);
            newGameResult.setXp(xp);
            gameResultRepository.save(newGameResult);
        }
    }
   /* public GameResult updateGameResult(Long userId, GameResult gameResult) {
        GameResult gameResult1 = gameResultRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("GameResult not found."));
        gameResult1.setUserId(gameResult.getUserId());
        gameResult1.setSnakeScore(gameResult.getSnakeScore());
        gameResult1.setLightsOutScore(gameResult.getLightsOutScore());
        gameResult1.setXp(gameResult.getXp());
        return gameResultRepository.save(gameResult1);
    }*/


    public GameResult updateSnakeResult(Long userId, int score) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findById(userId);
        if (optionalGameResult.isPresent()) {
            GameResult gameResult = optionalGameResult.get();
            if(gameResult.getSnakeScore() < score){
                gameResult.setSnakeScore(score);
                gameResultRepository.save(gameResult);
                return gameResult;
            }
            return gameResult;
        } else {
            GameResult newGameResult = new GameResult();
            newGameResult.setId(userId);
            newGameResult.setSnakeScore(score);
            gameResultRepository.save(newGameResult);
            return newGameResult;
        }
    }

    public GameResult updateLightsOutResult(Long userId, int score) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findById(userId);
        if (optionalGameResult.isPresent()) {
            GameResult gameResult = optionalGameResult.get();
            if(gameResult.getLightsOutScore() < score){
                gameResult.setLightsOutScore(score);
                gameResultRepository.save(gameResult);
                return gameResult;
            }
            return gameResult;
        } else {
            GameResult newGameResult = new GameResult();
            newGameResult.setId(userId);
            newGameResult.setLightsOutScore(score);
            gameResultRepository.save(newGameResult);
            return newGameResult;
        }
    }

}
