package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.registerUser(user));
    }

    @GetMapping
    public String aaa() {
        return "aaa";
    }
}
