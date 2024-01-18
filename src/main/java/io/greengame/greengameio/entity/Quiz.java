package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id", nullable = false, unique = true)
    private Long quizID;

    @Column(name = "quiz_title", nullable = false, unique = true)
    @NotBlank(message = "Quiz title can neither be null nor empty.")
    private String quizTitle;

    @Column(name = "quiz_length", nullable = false)
    @Positive(message = "There must be at least one question in each and every quiz.")
    private int quizLength;

    @Column(name = "quiz_creator", nullable = false)
    @NotBlank(message = "Every quiz must contain its creators login.")
    private String quizCreatorName;

    @Column(name = "quiz_open_date", nullable = false)
    @NotNull(message = "Open date for quiz must be specified.")
    private LocalDateTime quizOpenDate;

    @OneToMany
    @NotNull(message = "List of questions for a quiz could not be null.")
    @Size(min = 1, message = "Every quiz must contain at least one question.")
    @Size(max = 10, message = "Quiz could not have more than 10 questions.")
    private List<Question> listOfQuestions;

    public Quiz(@NotBlank(message = "Quiz title can neither be null nor empty.") String quizTitle,
                @NotBlank(message = "Every quiz must contain its creators login.") String quizCreatorName,
                @NotNull(message = "Open date for quiz must be specified.") LocalDateTime quizOpenDate,
                @NotNull(message = "List of questions for a quiz could not be null.")
                @Size(min = 1, message = "Every quiz must contain at least one question.")
                @Size(max = 10, message = "Quiz could not have more than 10 questions.") List<Question> listOfQuestions) {
        this.quizTitle = quizTitle;
        this.quizLength = listOfQuestions.size();
        this.quizCreatorName = quizCreatorName;
        this.quizOpenDate = quizOpenDate.truncatedTo(ChronoUnit.SECONDS);
        this.listOfQuestions = listOfQuestions;
    }

    public Question getCertainQuestion(int questionNumber) {
        return this.listOfQuestions.get(questionNumber);
    }
}
