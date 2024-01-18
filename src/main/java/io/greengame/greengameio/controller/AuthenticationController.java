package io.greengame.greengameio.controller;

import io.greengame.greengameio.dtos.LogInDto;
import io.greengame.greengameio.dtos.SignUpDto;
import io.greengame.greengameio.dtos.UserDto;
import io.greengame.greengameio.friendmodule.exceptions.NotFoundException;
import io.greengame.greengameio.security.UserAuthProvider;
import io.greengame.greengameio.services.AuthenticationService;
import io.greengame.greengameio.services.ResetPasswordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserAuthProvider userAuthProvider;

    private final ResetPasswordService resetPasswordService;

    public AuthenticationController(AuthenticationService authenticationService, UserAuthProvider userAuthProvider, ResetPasswordService resetPasswordService) {
        this.authenticationService = authenticationService;
        this.userAuthProvider = userAuthProvider;
        this.resetPasswordService = resetPasswordService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody SignUpDto user) {
        UserDto userDto = authenticationService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LogInDto login) {
        UserDto userDto = authenticationService.loginUser(login);
        userDto.setToken(userAuthProvider.createToken(userDto.getLogin()));
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> emailMap) {
        String email = emailMap.get("email");

        try {
            resetPasswordService.sendPasswordResetEmail(email);
            return new ResponseEntity<>("Password reset email sent successfully", HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error sending password reset email", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
