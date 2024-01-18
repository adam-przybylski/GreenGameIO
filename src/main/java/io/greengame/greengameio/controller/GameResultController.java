package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.services.GameResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/api/v1/games")
@RequiredArgsConstructor
public class GameResultController {

    private final GameResultService gameResultService;

    @GetMapping("/xp/{userId}")
    double getXpByUserId(@PathVariable Long userId) {
        return gameResultService.getXpByUserId(userId);
    }
    @GetMapping("snake/{userId}")
    int getSnakeScore(@PathVariable Long userId){
        return gameResultService.getSnakeScoreByUserId(userId);
    }
    @GetMapping("lightsOut/{userId}")
    int getLightOutScore(@PathVariable Long userId){
        return gameResultService.getLightOutScoreByUserId(userId);
    }

    @PostMapping("updateUserXP/{userId}/{xp}")
    GameResult updateUserXP(@PathVariable Long userId,@PathVariable double xp) {
        return gameResultService.updateUserXP(userId, xp);
    }

    @PostMapping("snake/{userId}/{snakeScore}")
    GameResult updateSnakeResult(@PathVariable Long userId, @PathVariable int snakeScore) {
        return gameResultService.updateSnakeResult(userId, snakeScore);
    }

    @PostMapping("lightsOut/{userId}/{lightsOutScore}")
    GameResult updateLightsOutResult(@PathVariable Long userId,@PathVariable int lightsOutScore) {
        return gameResultService.updateLightsOutResult(userId, lightsOutScore);
    }

    @GetMapping("/fruitCatcher/{userId}")
    int getFruitCatcherScoreByUserId(@PathVariable Long userId) {
        return gameResultService.getFruitCatcherScoreByUserId(userId);
    }

    @PostMapping("fruitCatcher/{userId}/{fruitCatcherScore}")
    GameResult updateFruitCatcherResult(@PathVariable Long userId,@PathVariable int fruitCatcherScore) {
        return gameResultService.updateFruitCatcherResult(userId, fruitCatcherScore);
    }

    @GetMapping("/plumber/{userId}")
    int getPlumberScoreByUserId(@PathVariable Long userId) {
        return gameResultService.getPlumberScoreByUserId(userId);
    }

    @PostMapping("plumber/{userId}/{plumberScore}")
    GameResult updatePlumberResult(@PathVariable Long userId,@PathVariable int plumberScore) {
        return gameResultService.updatePlumberResult(userId, plumberScore);
    }
}
