package io.greengame.greengameio.dtos.quizzes.mappers;

import io.greengame.greengameio.dtos.quizzes.output_dtos.HiScoreOutputDTO;
import io.greengame.greengameio.entity.HiScore;

public class HiScoreMapper {

    public static HiScoreOutputDTO toHiScoreOutputDTO(HiScore hiScore, int currentScore) {
        return new HiScoreOutputDTO(hiScore.getQuiz().getQuizID(), hiScore.getQuiz().getQuizTitle(), hiScore.getUser().getUsername(), currentScore, hiScore.getHiScore());
    }
}
