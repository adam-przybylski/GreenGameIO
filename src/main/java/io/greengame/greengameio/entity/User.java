package io.greengame.greengameio.entity;


import io.greengame.greengameio.exceptions.Messages;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    @NotBlank(message = "Username is mandatory")
    private String username;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Password is mandatory")
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email")
    private String email;

    @Column(name = "user_type", nullable = false)
    private UserType type;

    @OneToMany(targetEntity = UserNotification.class)
    private List<UserNotification> userNotifications;

    @Column(name = "odznaka", nullable = false)
    private Long odznaka;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;


    public User(String username, String password, String email, UserType type) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.type = type;
        this.odznaka = 1L;
    }
}
