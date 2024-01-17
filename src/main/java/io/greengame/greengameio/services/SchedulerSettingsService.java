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

    public List<SchedulerSettings> get() {
        return repository.findAll();
    }

    public SchedulerSettings getSchedulerSettingsByNotification(Notification notification) {
        Optional<SchedulerSettings> result = repository.findByNotification(notification);

        return result.orElseGet(() -> SchedulerSettings.getDefaultSettings(notification));
    }

    public SchedulerSettings update(SchedulerSettings schedulerSettings) {
        Optional<SchedulerSettings> result = repository.findByNotification(schedulerSettings.getNotification());

        if (result.isEmpty()) {
            repository.saveAndFlush(new SchedulerSettings(schedulerSettings.isActive(),
                    schedulerSettings.getTime(),
                    schedulerSettings.isInfinite(),
                    schedulerSettings.getRepeat(),
                    schedulerSettings.getNotification()));
        } else {
            SchedulerSettings settings = result.get();
            settings.setActive(schedulerSettings.isActive());
            settings.setTime(schedulerSettings.getTime());
            settings.setInfinite(schedulerSettings.isInfinite());
            settings.setRepeat(schedulerSettings.getRepeat());
            repository.saveAndFlush(settings);
        }

        return repository.findByNotification(schedulerSettings.getNotification()).get();
    }
}
