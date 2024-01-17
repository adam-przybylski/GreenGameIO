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

    @GetMapping("{notificationId}")
    public SchedulerSettings get(@PathVariable Long notificationId) {
        return schedulerSettingsService.getSchedulerSettingsByNotificationId(notificationId);
    }

    @PutMapping("{notificationId}")
    public SchedulerSettings update(@PathVariable Long notificationId, @RequestBody SchedulerSettings schedulerSettings) {
        return schedulerSettingsService.update(notificationId, schedulerSettings);
    }
}
