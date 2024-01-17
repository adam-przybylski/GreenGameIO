package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "scheduler_settings")
public class SchedulerSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id", nullable = false)
    private Long id;
    private boolean isActive;
    private Date time;
    private boolean isInfinite;
    private int repeat;
    @OneToOne
    private Notification notification;

    public SchedulerSettings(boolean isActive, Date time, boolean isInfinite, int repeat, Notification notification) {
        this.isActive = isActive;
        this.time = time;
        this.isInfinite = isInfinite;
        this.repeat = repeat;
        this.notification = notification;
    }

    public static SchedulerSettings getDefaultSettings(Notification notification) {
        return new SchedulerSettings(false, null, false, 0, notification);
    }
}