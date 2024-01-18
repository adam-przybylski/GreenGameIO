package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "user_tasks")
public class UserTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "taskId", nullable = false)
    @NotNull(message = "TaskId is mandatory")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @NotNull(message = "UserId is mandatory")
    private User user;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "done", nullable = false)
    private boolean done;
}
