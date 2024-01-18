package io.greengame.greengameio.dtos.quizzes.input_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionInputDTO {

    private String questionContent;
    private int questionNumber;
    private List<AnswerInputDTO> listOfAnswers;
}
