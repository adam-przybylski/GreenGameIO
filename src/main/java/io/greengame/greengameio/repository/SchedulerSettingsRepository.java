package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.entity.SchedulerSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface SchedulerSettingsRepository extends JpaRepository<SchedulerSettings, Long> {
    Optional<SchedulerSettings> findByNotification(Notification notification);

    Optional<SchedulerSettings> findByNotification_Id(Long notificationId);
    List<SchedulerSettings> findAllByIsActive(boolean value);
    void deleteByNotification(Notification notification);
}
