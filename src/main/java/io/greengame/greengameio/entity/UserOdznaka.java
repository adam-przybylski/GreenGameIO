package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "USER_ODZNAKA",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "odznaka_id"}))
@NoArgsConstructor
@AllArgsConstructor
public class UserOdznaka {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "odznaka_id", nullable = false)
    private Long odznakaId;

    public UserOdznaka(Long userId, Long odznakaId) {
        this.userId = userId;
        this.odznakaId = odznakaId;
    }
}
