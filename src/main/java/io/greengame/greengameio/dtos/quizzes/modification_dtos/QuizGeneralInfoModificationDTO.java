package io.greengame.greengameio.dtos.quizzes.modification_dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizGeneralInfoModificationDTO {

    private String quizTitle;
    private LocalDateTime quizOpenDate;
}
