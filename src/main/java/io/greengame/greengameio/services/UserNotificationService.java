package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserNotification;
import io.greengame.greengameio.repository.UserNotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserNotificationService {
    private final UserNotificationRepository repository;

    public List<UserNotification> getByUserId(User user) {
        return repository.findAllByUser(user);
    }

    public UserNotification getNewest(User user) {
        List<UserNotification> notifications = repository.findAllByUserAndSended(user, false);

        if (notifications.isEmpty()) {
            return null;
        }

        UserNotification userNotification = notifications.get(0);
        userNotification.setSended(true);
        repository.save(userNotification);
        return userNotification;
    }

    public UserNotification create(User user, UserNotification userNotification) {
        userNotification.setUser(user);
        return repository.save(userNotification);
    }

    public void delete(User user, Long id) {
        Optional<UserNotification> userNotification = repository.findById(id);

        if (userNotification.isPresent() && Objects.equals(userNotification.get().getUser().getId(), user.getId())) {
            repository.delete(userNotification.get());
        }
    }
}
