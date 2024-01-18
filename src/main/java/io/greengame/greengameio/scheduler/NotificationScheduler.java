package io.greengame.greengameio.scheduler;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.services.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NotificationScheduler {
    private final SchedulerSettingsService schedulerSettingsService;
    private final UserPreferencesService userPreferencesService;
    private final UserNotificationService userNotificationService;
    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(NotificationScheduler.class);

    @Scheduled(cron = "0 */1 * * * *")
    public void scheduleNotificationTask() {
        logger.info("Sending notifications");
        List<SchedulerSettings> settings = schedulerSettingsService.getByActive(true);
        List<User> users = userService.getUsers();
        List<User> targetUsers = new ArrayList<>();

        users.forEach((user) -> {
            UserPreferences preferences = userPreferencesService.getUserPreferencesByUser(user);

            if (preferences.isGetEventNotification()) {
                targetUsers.add(user);
            }
        });

        LocalDateTime currentDate = LocalDateTime.now();

        settings.forEach((setting) -> {
            if (setting.isInfinite() || (!setting.isInfinite() && setting.getRepeat() > 0)) {
                if (setting.getLastSended() == null || currentDate.getDayOfMonth() != setting.getLastSended().getDayOfMonth()) {
                    if (currentDate.getHour() >= setting.getTime().getHour() && currentDate.getMinute() >= setting.getTime().getMinute()) {
                        targetUsers.forEach((user) -> {
                            userNotificationService.create(user, new UserNotification(setting.getNotification(), false));
                        });

                        if (!setting.isInfinite()) {
                            setting.setRepeat(setting.getRepeat() - 1);
                        }

                        setting.setLastSended(currentDate);
                        schedulerSettingsService.update(setting.getNotification().getId(), setting);
                    }
                }
            }
        });
    }
}
