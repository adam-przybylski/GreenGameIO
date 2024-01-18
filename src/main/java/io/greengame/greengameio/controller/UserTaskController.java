package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserTask;
import io.greengame.greengameio.exceptions.TaskNotFoundException;
import io.greengame.greengameio.security.UserAuthProvider;
import io.greengame.greengameio.services.UserService;
import io.greengame.greengameio.services.UserTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping(value = "/api/v1/usertasks", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserTaskController {
    private final UserService userService;
    private final UserAuthProvider authProvider;
    private final UserTaskService userTaskService;
    private User getUserFromComplexToken(String complexToken) {
        String token = complexToken.replace("Bearer ", "");
        String login = authProvider.getUserLogin(token);
        return userService.getUserByUsername(login);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userTaskService.getById(id));
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<List<UserTask>> getAllUserTasks(@RequestHeader("Authorization") String complexToken) {
        User user = getUserFromComplexToken(complexToken);
        return ResponseEntity.ok(userTaskService.getAllUserTasks(user.getId()));
    }

    @GetMapping("/active")
    public ResponseEntity<List<UserTask>> getAllActiveUserTasks(@RequestHeader("Authorization") String complexToken) {
        User user = getUserFromComplexToken(complexToken);
        return ResponseEntity.ok(userTaskService.getAllActiveUserTasks(user.getId()));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<String> completeTask(@PathVariable Long id) {
        try {
            userTaskService.completeTask(id);
            return ResponseEntity.noContent().build();
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}