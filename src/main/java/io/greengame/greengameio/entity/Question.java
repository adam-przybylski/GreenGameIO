package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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
    @NotBlank(message = "Question content could neither be null nor empty string.")
    private String questionContent;

    @Column(name = "question_number")
    @Positive(message = "Question could not have a number that is non positive.")
    private int questionNumber;

    @OneToMany
    @NotNull(message = "List of answers for a question could not be null.")
    @Size(min = 2, message = "Every question must contain at least two answers.")
    @Size(max = 5, message = "Question could not have more than 5 total answers.")
    private List<Answer> listOfAnswers;

    public Question(@NotBlank(message = "Question content could neither be null nor empty string.") String questionContent,
                    @Positive(message = "Question could not have a number that is non positive.") int questionNumber,
                    @NotNull(message = "List of questions for a quiz could not be blank.")
                    @NotNull(message = "List of answers for a question could not be null.")
                    @Size(min = 2, message = "Every question must contain at least two answers.")
                    @Size(max = 5, message = "Question could not have more than 5 total answers.") List<Answer> listOfAnswers) {
        this.questionContent = questionContent;
        this.questionNumber = questionNumber;
        this.listOfAnswers = listOfAnswers;
    }

    public Answer getCertainAnswer(int answerNumber) {
        return this.getListOfAnswers().get(answerNumber);
    }
}
