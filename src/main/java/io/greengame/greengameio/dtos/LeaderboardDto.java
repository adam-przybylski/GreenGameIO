package io.greengame.greengameio.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaderboardDto {
    String username;
    Double xp;
    Long pinnedAwardId;
    Integer score;

//    public Integer getScore() {
//        return this.score;
//    }
//
//    @Override
//    public int compareTo(LeaderboardDto u) {
//        return this.score - u.getScore();
//    }
}
