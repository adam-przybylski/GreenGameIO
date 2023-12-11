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
    private final NotificationRepository repository;

    public List<Notification> get() {
        return repository.findAll();
    }

    public Notification create(Notification notification) {
        return repository.save(notification);
    }

    public Notification update(Notification entity) {
        Optional<Notification> result = repository.findById(entity.getId());
        if (result.isPresent()) {
            Notification notification = result.get();
            notification.setContent(entity.getContent());
            notification.setTitle(entity.getTitle());
            repository.saveAndFlush(notification);
        }

        return repository.findById(entity.getId()).orElse(null);
    }

    public void delete(Long id) {
        Notification result = repository.findById(id).orElseThrow();
        repository.delete(result);
    }
}
