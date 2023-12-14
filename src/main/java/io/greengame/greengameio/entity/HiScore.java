package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hi_scores")
public class HiScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hi_score_id", nullable = false, unique = true)
    private Long hiScoreID;

    @ManyToOne
    @NotNull(message = "High score must contain a reference to quiz object.")
    private Quiz quiz;

    @ManyToOne
    @NotNull(message = "High score must contain a reference to user object.")
    private User user;

    @Column(name = "hi_score", nullable = false)
    @PositiveOrZero(message = "Quiz score cannot be negative.")
    private int hiScore;

    public HiScore(@NotNull(message = "High score must contain a reference to quiz object.") Quiz quiz,
                   @NotNull(message = "High score must contain a reference to user object.") User user,
                   int hiScore) {
        this.quiz = quiz;
        this.user = user;
        this.hiScore = hiScore;
    }
}
