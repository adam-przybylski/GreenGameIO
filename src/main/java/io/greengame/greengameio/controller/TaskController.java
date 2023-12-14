package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.exceptions.TaskNotFoundException;
import io.greengame.greengameio.exceptions.TaskValidationException;
import io.greengame.greengameio.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@Validated
@RequestMapping(value = "/api/v1/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    @GetMapping("/{id}")
    ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(taskService.getById(id));
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    ResponseEntity<List<Task>> get() {
        return ResponseEntity.ok(taskService.get());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> delete(@PathVariable Long id) {
        taskService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    ResponseEntity<?> update(@PathVariable Long id, @RequestBody Task task) {
        try {
            var result = taskService.update(id, task);

            return ResponseEntity.ok(result);
        } catch (TaskValidationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    ResponseEntity<?> create(@RequestBody Task task) throws URISyntaxException {
        try {
            var result = taskService.create(task);

            URI location = new URI("http://localhost:3000/tasks/" + result.getId());
            return ResponseEntity.created(location).body(result);
        } catch (TaskValidationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
