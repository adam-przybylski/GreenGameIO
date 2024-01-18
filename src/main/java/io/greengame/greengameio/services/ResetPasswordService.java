package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.exceptions.Messages;
import io.greengame.greengameio.exceptions.UnknownUserException;
import io.greengame.greengameio.security.UserAuthProvider;
import org.springframework.stereotype.Service;

@Service
public class ResetPasswordService {

    private final EmailNotificationService emailService;

    private final UserService userService;

    private final UserAuthProvider authProvider;

    public ResetPasswordService(EmailNotificationService emailService, UserService userService, UserAuthProvider authProvider) {
        this.emailService = emailService;
        this.userService = userService;
        this.authProvider = authProvider;
    }

    public void sendPasswordResetEmail(String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new UnknownUserException(Messages.USER_WITH_GIVEN_EMAIL_DOES_NOT_EXIST);
        }

        String token = authProvider.generatePasswordResetToken(user.getUsername());

        String resetLink = "http://localhost:3000/change-password/" + token;
        String emailBody = "Click the following link to reset your password: " + resetLink;

        emailService.sendEmail(email, "Password Reset", emailBody);
    }
}
