package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.services.GameResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/api/v1/games1")
@RequiredArgsConstructor
public class GameResultController {

    private final GameResultService gameResultService;

    @GetMapping("/xp/{userId}")
    int getXpByUserId(@PathVariable Long userId) {
        return gameResultService.getXpByUserId(userId);
    }

    @PostMapping("/id/{userId}")
    GameResult updateGameResult(@PathVariable Long userId, @RequestBody GameResult gameResult) {
        return gameResultService.updateGameResult(userId, gameResult);
    }

}
