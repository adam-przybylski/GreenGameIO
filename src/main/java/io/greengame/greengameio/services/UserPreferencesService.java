package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserPreferences;
import io.greengame.greengameio.repository.UserPreferencesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserPreferencesService {
    private final UserPreferencesRepository repository;

    public UserPreferences getUserPreferencesByUser(User user) {
        Optional<UserPreferences> result = repository.findByUser(user);

        return result.orElseGet(UserPreferences::getDefaultPreferences);
    }

    public UserPreferences update(UserPreferences preferences, User user) {
        Optional<UserPreferences> result = repository.findByUser(user);

        if (result.isEmpty()) {
            repository.saveAndFlush(new UserPreferences(preferences.isGetPopUpNotification(),
                    preferences.isGetEmailNotification(),
                    preferences.isGetEventNotification(),
                    user));
        } else {
            UserPreferences curr = result.get();
            curr.setGetPopUpNotification(preferences.isGetPopUpNotification());
            curr.setGetEmailNotification(preferences.isGetEmailNotification());
            curr.setGetEventNotification(preferences.isGetEventNotification());
            repository.saveAndFlush(curr);
        }

        return repository.findByUser(user).get();
    }
}
