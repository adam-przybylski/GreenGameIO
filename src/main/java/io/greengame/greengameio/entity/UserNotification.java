package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_notifications")
public class UserNotification extends Notification{
    @Column(name = "sended", nullable = false)
    @NotBlank(message = "Content is mandatory")
    private boolean sended;

    @Column(name = "userId", nullable = false)
    @NotBlank(message = "UserId is mandatory")
    private long userId;

    public UserNotification(@NotBlank(message = "Title is mandatory") String title, @NotBlank(message = "Content is mandatory") String content, boolean sended, long userId) {
        super(title, content);
        this.sended = sended;
        this.userId = userId;
    }
}
