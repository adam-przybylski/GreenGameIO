package io.greengame.greengameio.dtos.quizzes.modification_dtos;

import io.greengame.greengameio.dtos.quizzes.input_dtos.QuestionInputDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionModificationDTO {

    private List<QuestionInputDTO> listOfQuestions;
}
