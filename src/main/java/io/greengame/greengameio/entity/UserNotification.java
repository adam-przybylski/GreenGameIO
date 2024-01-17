package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
@Table(name = "user_notifications")
public class UserNotification extends Notification {

    @Column(name = "sended", nullable = false)
    @NotNull(message = "Content is mandatory")
    private boolean sended;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @NotNull(message = "UserId is mandatory")
    private User user;

    public UserNotification(@NotBlank(message = "Title is mandatory") String title, @NotBlank(message = "Content is mandatory") String content, boolean sended, User user) {
        super(title, content);
        this.sended = sended;
        this.user = user;
    }

    public UserNotification(Long id, @NotBlank(message = "Title is mandatory") String title, @NotBlank(message = "Content is mandatory") String content, boolean sended, User user) {
        super(id, title, content);
        this.sended = sended;
        this.user = user;
    }

    public UserNotification(Notification notification, Boolean sended) {
        super(notification.getId(), notification.getTitle(), notification.getContent());
        this.sended = sended;
    }
}
