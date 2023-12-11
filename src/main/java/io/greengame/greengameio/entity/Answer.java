package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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

    @Column(name = "answer_content", nullable = false)
    @NotEmpty(message = "Content of an answer could not be empty.")
    private String answerContent;

    public Answer(String answerContent) {
        this.answerContent = answerContent;
    }
}
