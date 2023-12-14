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
    @NotEmpty(message = "Quiz title cannot be an empty string.")
    private String quizTitle;

    @Column(name = "quiz_length", nullable = false)
    @Positive(message = "Number of questions in a quiz cannot be negative or zero.")
    private int quizLength;

    @ManyToOne
    @NotNull(message = "Quiz object must contain a reference to quiz creator object.")
    private User quizCreator;

    @Column(name = "quiz_open_date", nullable = false)
    @NotNull(message = "Open date for quiz must be specified.")
    private LocalDateTime quizOpenDate;

    @OneToMany
    private List<Question> listOfQuestions;

    public Quiz(String quizTitle,
                int quizLength,
                @NotNull(message = "Quiz object must contain a reference to quiz creator object.") User quizCreator,
                @NotNull(message = "Open date for quiz must be specified.") LocalDateTime quizOpenDate,
                List<Question> listOfQuestions) {
        this.quizTitle = quizTitle;
        this.quizLength = quizLength;
        this.quizCreator = quizCreator;
        this.quizOpenDate = quizOpenDate.truncatedTo(ChronoUnit.SECONDS);
        this.listOfQuestions = listOfQuestions;
    }
}
