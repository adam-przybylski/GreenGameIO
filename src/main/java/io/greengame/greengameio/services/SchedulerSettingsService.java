package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.entity.SchedulerSettings;
import io.greengame.greengameio.repository.NotificationRepository;
import io.greengame.greengameio.repository.SchedulerSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SchedulerSettingsService {
    private final SchedulerSettingsRepository repository;
    private final NotificationRepository notificationRepository;

    public List<SchedulerSettings> get() {
        return repository.findAll();
    }

    public List<SchedulerSettings> getByActive(boolean value) {
        return repository.findAllByIsActive(value);
    }
    public SchedulerSettings getSchedulerSettingsByNotificationId(Long notificationId) {
        Optional<SchedulerSettings> result = repository.findByNotification_Id(notificationId);
        Optional<Notification> notification = notificationRepository.findById(notificationId);

        if (notification.isEmpty()) {
            return null;
        }

        return result.orElseGet(() -> SchedulerSettings.getDefaultSettings(notification.get()));
    }

    public SchedulerSettings update(Long notificationId, SchedulerSettings schedulerSettings) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);

        if (notification.isEmpty()) {
            return null;
        }
        Optional<SchedulerSettings> result = repository.findByNotification_Id(notificationId);

        if (result.isEmpty()) {
            repository.saveAndFlush(new SchedulerSettings(schedulerSettings.isActive(),
                    schedulerSettings.getTime(),
                    schedulerSettings.isInfinite(),
                    schedulerSettings.getRepeat(),
                    notification.get()));
        } else {
            SchedulerSettings settings = result.get();
            settings.setActive(schedulerSettings.isActive());
            settings.setTime(schedulerSettings.getTime());
            settings.setLastSended(schedulerSettings.getLastSended());
            settings.setInfinite(schedulerSettings.isInfinite());
            settings.setRepeat(schedulerSettings.getRepeat());
            repository.saveAndFlush(settings);
        }

        return repository.findByNotification_Id(notificationId).get();
    }
}
