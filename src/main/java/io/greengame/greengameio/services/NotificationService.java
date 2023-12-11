package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<Notification> get(){
        return notificationRepository.findAll();
    };

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }
}
