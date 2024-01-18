package io.greengame.greengameio.services;

import io.greengame.greengameio.controller.OdznakaUserController;
import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.repository.GameResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameResultService {

    private final GameResultRepository gameResultRepository;
    private final UserOdznakaService odznakaService;

    public GameResult createGameResult(GameResult gameResult) {
        return gameResultRepository.save(gameResult);
    }

    public double  getXpByUserId(Long userId) {
        Optional<Long> optionalLong = gameResultRepository.findXpByUserId(userId);
        if (optionalLong.isPresent()) {
            return optionalLong.get();
        } else {
            return 0;
        }
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
        if(score > 5) {
            odznakaService.dodajOdznakeDlaUzytkownika(userId, 4L);
        }
        if(score > 11) {
            odznakaService.dodajOdznakeDlaUzytkownika(userId, 6L);
        }
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
        if(score > 5) {
            odznakaService.dodajOdznakeDlaUzytkownika(userId, 3L);
        }
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
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
        return optionalGameResult.map(GameResult::getFruitCatcher).orElse(0);
    }

    public int getPlumberScoreByUserId(Long userId) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
        return optionalGameResult.map(GameResult::getPlumber).orElse(0);
    }

    public GameResult updateFruitCatcherResult(Long userId, int score) {
        if(score > 299) {
            odznakaService.dodajOdznakeDlaUzytkownika(userId, 5L);
        }
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

    public GameResult updatePlumberResult(Long userId, int score) {
        Optional<GameResult> optionalGameResult = gameResultRepository.findByUserId(userId);
        if (optionalGameResult.isPresent()) {
            GameResult gameResult = optionalGameResult.get();
            if(gameResult.getPlumber() < score){
                gameResult.setPlumber(score);
                gameResultRepository.save(gameResult);
                return gameResult;
            }
            return gameResult;
        } else {
            GameResult newGameResult = new GameResult();
            newGameResult.setUserId(userId);
            newGameResult.setPlumber(score);
            gameResultRepository.save(newGameResult);
            return newGameResult;
        }
    }
}