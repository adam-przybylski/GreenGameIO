package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<Notification> get() {
        return notificationRepository.findAll();
    }

    public Notification create(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification update(Notification entity) {
        Optional<Notification> result = notificationRepository.findById(entity.getId());
        if (result.isPresent()) {
            Notification notification = result.get();
            notification.setContent(entity.getContent());
            notification.setTitle(entity.getTitle());
            notificationRepository.saveAndFlush(notification);
        }

        return notificationRepository.findById(entity.getId()).orElse(null);
    }

    public void delete(Long id) {
        Notification result = notificationRepository.findById(id).orElseThrow();
        notificationRepository.delete(result);
    }
}
