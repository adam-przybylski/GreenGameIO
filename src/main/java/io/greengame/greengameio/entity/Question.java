package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id", nullable = false, unique = true)
    private Long questionID;

    @Column(name = "quiz_content", nullable = false)
    @NotEmpty(message = "Question content could not be an empty string.")
    private String questionContent;

    @Column(name = "question_number")
    @Positive(message = "Question could not have a number that is non positive.")
    private int questionNumber;

    @OneToMany
    @NotNull(message = "List of questions for a quiz could not be blank.")
    private List<Answer> questionAnswers;

    @OneToOne
    @NotNull(message = "Every question must have a correct answer.")
    private Answer correctAnswer;

    public Question(String questionContent,
                    int questionNumber,
                    @NotNull(message = "List of questions for a quiz could not be blank.") List<Answer> questionAnswers,
                    @NotNull(message = "Every question must have a correct answer.") Answer correctAnswer) {
        this.questionContent = questionContent;
        this.questionNumber = questionNumber;
        this.questionAnswers = questionAnswers;
        this.correctAnswer = correctAnswer;
    }
}
