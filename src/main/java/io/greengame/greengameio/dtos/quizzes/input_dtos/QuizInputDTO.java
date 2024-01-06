package io.greengame.greengameio.dtos.quizzes.input_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizInputDTO {

    private String quizTitle;
    private String quizCreatorName;
    private LocalDateTime quizOpenDate;
    private List<QuestionInputDTO> listOfQuestions;
}
