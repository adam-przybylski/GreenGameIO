package io.greengame.greengameio.dtos.quizzes.input_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerInputDTO {

    private String answerContent;
    private boolean correct;
}
