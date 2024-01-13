package io.greengame.greengameio.controller;


import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@Validated
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @DeleteMapping("/username/{username}")
    long deleteUser(@PathVariable String username) {
        return userService.deleteUser(username);
    }

    @GetMapping
    List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/email/{email}")
    User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/username/{username}")
    User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/id/{id}")
    User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/username/{username}")
    User updateUser(@PathVariable String username, @RequestBody User user) {
        return userService.updateUser(username, user);
    }

    @PatchMapping("/id/{id}")
    User updateUsername(@PathVariable Long id, @RequestBody Map<String, String> username) {
        return userService.updateUsername(id, username.get("username"));
    }

   /* @GetMapping("/awards/{id}")
    List<Odznaka> getAwardsBelongToUser(@PathVariable Long id) {
        Set<Odznaka> set = userService.getUserById(id).getOdznaki();
        List<Odznaka> lista = new ArrayList<>(set);
        return lista;
    }*/
}
