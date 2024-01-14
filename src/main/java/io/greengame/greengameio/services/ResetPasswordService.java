package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.friendmodule.exceptions.NotFoundException;
import io.greengame.greengameio.security.UserAuthProvider;
import org.springframework.stereotype.Service;

@Service
public class ResetPasswordService {

    private final EmailServiceImpl emailService;

    private final UserService userService;

    private final UserAuthProvider authProvider;

    public ResetPasswordService(EmailServiceImpl emailService, UserService userService, UserAuthProvider authProvider) {
        this.emailService = emailService;
        this.userService = userService;
        this.authProvider = authProvider;
    }

    public void sendPasswordResetEmail(String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new NotFoundException("User not found");
        }

        String token = authProvider.generatePasswordResetToken(user.getUsername());

        String resetLink = "http://your-app-url/reset-password?token=" + token;
        String emailBody = "Click the following link to reset your password: " + resetLink;

        emailService.sendEmail(email, "Password Reset", emailBody);
    }
}
