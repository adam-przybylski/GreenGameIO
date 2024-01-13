package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserNotification;
import io.greengame.greengameio.security.UserAuthProvider;
import io.greengame.greengameio.services.UserNotificationService;
import io.greengame.greengameio.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/user/notifications")
@RequiredArgsConstructor
public class UserNotificationController {
    private final UserNotificationService userNotificationService;
    private final UserService userService;
    private final UserAuthProvider authProvider;

    private User getUserFromComplexToken(String complexToken) {
        String token = complexToken.replace("Bearer ", "");
        String login = authProvider.getUserLogin(token);
        return userService.getUserByUsername(login);
    }

    @GetMapping
    public List<UserNotification> get(@RequestHeader("Authorization") String complexToken) {
        User user = getUserFromComplexToken(complexToken);

        return userNotificationService.getByUserId(user);
    }

    @GetMapping("/newest")
    public List<UserNotification> getNewest(@RequestHeader("Authorization") String complexToken) {
        User user = getUserFromComplexToken(complexToken);
        return userNotificationService.getNewest(user);
    }

//    @PostMapping
//    public UserNotification create(@RequestHeader("Authorization") String complexToken, @RequestBody UserNotification userNotification) {
//        User user = getUserFromComplexToken(complexToken);
//        return userNotificationService.create(user, userNotification);
//    }

    @DeleteMapping("/{id}")
    public void delete(@RequestHeader("Authorization") String complexToken, @PathVariable Long id) {
        User user = getUserFromComplexToken(complexToken);
        userNotificationService.delete(user, id);
    }
}
