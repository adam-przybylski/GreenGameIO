package io.greengame.greengameio.services;


import io.greengame.greengameio.dtos.LeaderboardDto;
import io.greengame.greengameio.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final HiScoreService hiScoreService;

    private final UserService userService;

    private final GameResultService gameResultService;


    public List<LeaderboardDto> getSnakeLeaderboard() {
        List<LeaderboardDto> leaderboard = new ArrayList<>();
        List<User> users = userService.getUsers();

        for (User user : users) {
            LeaderboardDto leaderboardDto = new LeaderboardDto();
            leaderboardDto.setUsername(user.getUsername());
            leaderboardDto.setXp(gameResultService.getXpByUserId(user.getId()));
            leaderboardDto.setPinnedAwardId(user.getOdznaka());
            leaderboardDto.setScore(gameResultService.getSnakeScoreByUserId(user.getId()));
            leaderboard.add(leaderboardDto);
        }
        return leaderboard;
    }

    public List<LeaderboardDto> getLightsOutLeaderboard() {
        List<LeaderboardDto> leaderboard = new ArrayList<>();
        List<User> users = userService.getUsers();

        for (User user : users) {
            LeaderboardDto leaderboardDto = new LeaderboardDto();
            leaderboardDto.setUsername(user.getUsername());
            leaderboardDto.setXp(gameResultService.getXpByUserId(user.getId()));
            leaderboardDto.setPinnedAwardId(user.getOdznaka());
            leaderboardDto.setScore(gameResultService.getLightOutScoreByUserId(user.getId()));
            leaderboard.add(leaderboardDto);
        }
        return leaderboard;
    }

    public List<LeaderboardDto> getFruitCatcherLeaderboard() {
        List<LeaderboardDto> leaderboard = new ArrayList<>();
        List<User> users = userService.getUsers();

        for (User user : users) {
            LeaderboardDto leaderboardDto = new LeaderboardDto();
            leaderboardDto.setUsername(user.getUsername());
            leaderboardDto.setXp(gameResultService.getXpByUserId(user.getId()));
            leaderboardDto.setPinnedAwardId(user.getOdznaka());
            leaderboardDto.setScore(gameResultService.getFruitCatcherScoreByUserId(user.getId()));
            leaderboard.add(leaderboardDto);
        }
        return leaderboard;
    }

    public List<LeaderboardDto> getPlumberLeaderboard() {
        List<LeaderboardDto> leaderboard = new ArrayList<>();
        List<User> users = userService.getUsers();

        for (User user : users) {
            LeaderboardDto leaderboardDto = new LeaderboardDto();
            leaderboardDto.setUsername(user.getUsername());
            leaderboardDto.setXp(gameResultService.getXpByUserId(user.getId()));
            leaderboardDto.setPinnedAwardId(user.getOdznaka());
            leaderboardDto.setScore(gameResultService.getPlumberScoreByUserId(user.getId()));
            leaderboard.add(leaderboardDto);
        }
        return leaderboard;
    }
}
