package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id", nullable = false, unique = true)
    private Long answerID;

    @Column(name = "answer_number", nullable = false)
    @Positive(message = "Answer could not have a number that is non positive.")
    private int answerNumber;

    @Column(name = "answer_content", nullable = false)
    @NotBlank(message = "Content of an answer can neither be null nor empty string.")
    private String answerContent;

    @Column(name = "answer_correct", nullable = false)
    private boolean correct;

    public Answer(@Positive(message = "Question could not have a number that is non positive.") int answerNumber,
                  @NotBlank(message = "Content of an answer can neither be null nor empty string.") String answerContent,
                  boolean correct) {
        this.answerNumber = answerNumber;
        this.answerContent = answerContent;
        this.correct = correct;
    }
}
