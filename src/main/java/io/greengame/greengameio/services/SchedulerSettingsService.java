package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.entity.SchedulerSettings;
import io.greengame.greengameio.repository.SchedulerSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SchedulerSettingsService {
    private final SchedulerSettingsRepository repository;
    private final NotificationService notificationService;

    public List<SchedulerSettings> get() {
        return repository.findAll();
    }

    public SchedulerSettings getSchedulerSettingsByNotificationId(Long notificationId) {
        Optional<SchedulerSettings> result = repository.findByNotification_Id(notificationId);
        Notification notification = notificationService.getById(notificationId);

        if (notification == null) {
            return null;
        }

        return result.orElseGet(() -> SchedulerSettings.getDefaultSettings(notification));
    }

    public SchedulerSettings update(Long notificationId, SchedulerSettings schedulerSettings) {
        Notification notification = notificationService.getById(notificationId);

        if (notification == null) {
            return null;
        }

        Optional<SchedulerSettings> result = repository.findByNotification_Id(notificationId);

        if (result.isEmpty()) {
            repository.saveAndFlush(new SchedulerSettings(schedulerSettings.isActive(),
                    schedulerSettings.getTime(),
                    schedulerSettings.isInfinite(),
                    schedulerSettings.getRepeat(),
                    notification));
        } else {
            SchedulerSettings settings = result.get();
            settings.setActive(schedulerSettings.isActive());
            settings.setTime(schedulerSettings.getTime());
            settings.setInfinite(schedulerSettings.isInfinite());
            settings.setRepeat(schedulerSettings.getRepeat());
            repository.saveAndFlush(settings);
        }

        return repository.findByNotification_Id(notificationId).get();
    }
}
