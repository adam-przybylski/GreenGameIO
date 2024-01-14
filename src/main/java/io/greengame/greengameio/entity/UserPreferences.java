package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_preferences")
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "popup", nullable = false)
    @NotNull(message = "GetPopUpNotification is mandatory")
    private boolean getPopUpNotification;

    @Column(name = "email", nullable = false)
    @NotNull(message = "GetEmailNotification is mandatory")
    private boolean getEmailNotification;

    @Column(name = "event", nullable = false)
    @NotNull(message = "GetEventNotification is mandatory")
    private boolean getEventNotification;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @NotNull(message = "UserId is mandatory")
    private User user;

    public static UserPreferences getDefaultPreferences() {
        return new UserPreferences(true, true, true, null);
    }
    public UserPreferences(boolean getPopUpNotification, boolean getEmailNotification, boolean getEventNotification, User user) {
        this.getPopUpNotification = getPopUpNotification;
        this.getEmailNotification = getEmailNotification;
        this.getEventNotification = getEventNotification;
        this.user = user;
    }
}
