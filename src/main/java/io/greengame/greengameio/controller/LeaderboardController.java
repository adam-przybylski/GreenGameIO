package io.greengame.greengameio.controller;


import io.greengame.greengameio.dtos.LeaderboardDto;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.services.GameResultService;
import io.greengame.greengameio.services.HiScoreService;
import io.greengame.greengameio.services.LeaderboardService;
import io.greengame.greengameio.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;


    @GetMapping("/snake")
    public List<LeaderboardDto> getSnakeLeaderboard() {
        return leaderboardService.getSnakeLeaderboard();
    }

    @GetMapping("/lights-out")
    public List<LeaderboardDto> getLightsOutLeaderboard() {
        return leaderboardService.getLightsOutLeaderboard();
    }

    @GetMapping("/fruit-catcher")
    public List<LeaderboardDto> getFruitCatcherLeaderboard() {
        return leaderboardService.getFruitCatcherLeaderboard();
    }

    @GetMapping("/plumber")
    public List<LeaderboardDto> getPlumberLeaderboard() {
        return leaderboardService.getPlumberLeaderboard();
    }

}
