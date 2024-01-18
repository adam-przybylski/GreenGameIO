package io.greengame.greengameio.dtos.quizzes.output_dtos;

import io.greengame.greengameio.entity.HiScore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class HiScoreOutputDTO {

    private Long quizId;
    private String quizTitle;
    private String userName;
    private int currentScore;
    private int hiScore;
}
