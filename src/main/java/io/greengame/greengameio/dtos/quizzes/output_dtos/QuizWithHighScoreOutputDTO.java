package io.greengame.greengameio.dtos.quizzes.output_dtos;

import io.greengame.greengameio.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizWithHighScoreOutputDTO {

    private QuizWithCorrectAnswersDTO quizWithCorrectAnswersDTO;
    private int userHiScore;
}
