package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "game_results")
public class GameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "xp", nullable = false)
    private double xp;

    @Column(name = "snake_score")
    private int snakeScore;

    @Column(name = "lights_out_score")
    private int lightsOutScore;

    @Column(name = "fruit_catcher")
    private int fruitCatcher;
}
