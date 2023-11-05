package io.greengame.greengameio.controller;


import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public void createUser(@Valid @RequestBody User user) {
        userService.createUser(user);
    }

    @GetMapping("/user/{username}")
    public User getUser(@PathVariable String username) {
        return userService.getUser(username);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/user/{username}")
    public void updateUser(@PathVariable String username, @Valid @RequestBody User user) {
        userService.updateUser(username, user);
    }

    @DeleteMapping("/user/{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteUserByUsername(username);
    }


}
