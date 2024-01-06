package io.greengame.greengameio.dtos.quizzes.output_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizOutputDTO {

    private Long quizID;
    private String quizTitle;
    private String quizCreatorName;
    private LocalDateTime quizOpenDate;
    private int numberOfQuestions;
    private List<QuestionOutputDTO> listOfQuestions;
}
