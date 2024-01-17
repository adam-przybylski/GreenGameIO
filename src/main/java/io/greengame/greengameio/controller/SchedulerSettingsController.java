package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.entity.SchedulerSettings;
import io.greengame.greengameio.services.NotificationService;
import io.greengame.greengameio.services.SchedulerSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/api/v1/scheduler/settings")
@RequiredArgsConstructor
public class SchedulerSettingsController {
    private final SchedulerSettingsService schedulerSettingsService;
    private final NotificationService notificationService;

    @GetMapping
    public SchedulerSettings get(@RequestBody Long notificationId) {
        Notification notification = notificationService.getById(notificationId);

        if (notification == null) {
            return null;
        }

        return schedulerSettingsService.getSchedulerSettingsByNotification(notification);
    }

    @PutMapping
    public SchedulerSettings update(@RequestBody SchedulerSettings schedulerSettings) {
        return schedulerSettingsService.update(schedulerSettings);
    }
}
