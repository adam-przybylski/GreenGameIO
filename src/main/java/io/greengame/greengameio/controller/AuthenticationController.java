package io.greengame.greengameio.controller;

import io.greengame.greengameio.dtos.LogInDto;
import io.greengame.greengameio.dtos.SignUpDto;
import io.greengame.greengameio.dtos.UserDto;
import io.greengame.greengameio.security.UserAuthProvider;
import io.greengame.greengameio.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserAuthProvider userAuthProvider;

    public AuthenticationController(AuthenticationService authenticationService, UserAuthProvider userAuthProvider) {
        this.authenticationService = authenticationService;
        this.userAuthProvider = userAuthProvider;
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
}
