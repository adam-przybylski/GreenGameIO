package io.greengame.greengameio.dtos.quizzes.output_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerOutputDTO {

    private int answerNumber;
    private String answerContent;
}
