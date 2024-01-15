package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.security.UserAuthProvider;
import io.greengame.greengameio.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reset")
public class ResetPasswordController {

    private final UserAuthProvider authProvider;

    private final UserService userService;

    public ResetPasswordController(UserAuthProvider authProvider, UserService userService) {
        this.authProvider = authProvider;
        this.userService = userService;
    }


    @PostMapping("password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestBody Map<String, String> newPasswordMap) {
        String login = authProvider.getUserLogin(token);

        if (login != null) {
            User user = userService.getUserByUsername(login);

            String newPassword = newPasswordMap.get("newPassword");
            userService.updatePassword(user.getId(), newPassword);

            return new ResponseEntity<>("Password reset successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid or expired token", HttpStatus.BAD_REQUEST);
        }
    }

}
