package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserNotification;
import io.greengame.greengameio.entity.UserPreferences;
import io.greengame.greengameio.repository.UserNotificationRepository;
import io.greengame.greengameio.repository.UserPreferencesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserNotificationService {
    private final UserNotificationRepository repository;
    private final UserPreferencesService preferencesService;

    public List<UserNotification> getByUser(User user) {
        return repository.findAllByUser(user);
    }

    public List<UserNotification> getNewest(User user) {
        List<UserNotification> notifications = repository.findAllByUserAndSended(user, false);

        if (notifications.isEmpty()) {
            return null;
        }

        notifications.forEach(notification -> {
            notification.setSended(true);
            repository.save(notification);
        });

        UserPreferences preferences = preferencesService.getUserPreferencesByUser(user);

        if (!preferences.isGetPopUpNotification()) {
            return null;
        }

        return notifications;
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
