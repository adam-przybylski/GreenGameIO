package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserPreferences;
import io.greengame.greengameio.security.UserAuthProvider;
import io.greengame.greengameio.services.UserPreferencesService;
import io.greengame.greengameio.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/api/v1/user/preferences")
@RequiredArgsConstructor
public class UserPreferencesController {
    private final UserPreferencesService preferencesService;
    private final UserService userService;
    private final UserAuthProvider authProvider;

    private User getUserFromComplexToken(String complexToken) {
        String token = complexToken.replace("Bearer ", "");
        String login = authProvider.getUserLogin(token);
        return userService.getUserByUsername(login);
    }

    @GetMapping
    public UserPreferences get(@RequestHeader("Authorization") String complexToken) {
        User user = getUserFromComplexToken(complexToken);

        return preferencesService.getUserPreferencesByUser(user);
    }

    @PutMapping
    public UserPreferences update(@RequestHeader("Authorization") String complexToken, @RequestBody UserPreferences preferences) {
        User user = getUserFromComplexToken(complexToken);

        return preferencesService.update(preferences, user);
    }
}
