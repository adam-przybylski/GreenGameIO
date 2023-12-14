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

    public GameResult updateUserXP(Long userId,double xp) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
        if (optionalGameResult.isPresent()) {
            GameResult gameResult = optionalGameResult.get();
            double previousXp = gameResult.getXp();
            double actualXp = previousXp + xp;
            gameResult.setXp(actualXp);
            gameResultRepository.save(gameResult);
            return gameResult;
        } else {
            GameResult newGameResult = new GameResult();
            newGameResult.setUserId(userId);
            newGameResult.setXp(xp);
            gameResultRepository.save(newGameResult);
            return newGameResult;
        }
    }



    public GameResult updateSnakeResult(Long userId, int score) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
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
            newGameResult.setUserId(userId);
            newGameResult.setSnakeScore(score);
            gameResultRepository.save(newGameResult);
            return newGameResult;
        }
    }

    public GameResult updateLightsOutResult(Long userId, int score) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
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
            newGameResult.setUserId(userId);
            newGameResult.setLightsOutScore(score);
            gameResultRepository.save(newGameResult);
            return newGameResult;
        }
    }
    public int getSnakeScoreByUserId(Long userId){
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
        return optionalGameResult.map(GameResult::getSnakeScore).orElse(0);
    }
    public int getLightOutScoreByUserId(Long userId){
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
        return optionalGameResult.map(GameResult::getLightsOutScore).orElse(0);
    }

    public int getFruitCatcherScoreByUserId(Long userId) {
        return gameResultRepository.findFruitCatcherScoreByUserId(userId);
    }

    public GameResult updateFruitCatcherResult(Long userId, int score) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
        if (optionalGameResult.isPresent()) {
            GameResult gameResult = optionalGameResult.get();
            if(gameResult.getFruitCatcher() < score){
                gameResult.setFruitCatcher(score);
                gameResultRepository.save(gameResult);
                return gameResult;
            }
            return gameResult;
        } else {
            GameResult newGameResult = new GameResult();
            newGameResult.setUserId(userId);
            newGameResult.setFruitCatcher(score);
            gameResultRepository.save(newGameResult);
            return newGameResult;
        }
    }
}