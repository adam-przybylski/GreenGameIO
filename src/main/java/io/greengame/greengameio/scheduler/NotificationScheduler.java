package io.greengame.greengameio.scheduler;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.services.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotificationScheduler {
    private final NotificationService notificationService;
    private final Logger logger = LoggerFactory.getLogger(NotificationScheduler.class);

    public NotificationScheduler(NotificationService notificationService) {
        this.notificationService = notificationService;
    }


    @Scheduled(cron = "0 */1 * * * *")
    public void scheduleNotificationTask() {
        var size = notificationService.get().size();
        logger.info(String.valueOf(size));
    }
}
