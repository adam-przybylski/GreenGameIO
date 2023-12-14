package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.exceptions.TaskNotFoundException;
import io.greengame.greengameio.exceptions.TaskValidationException;
import io.greengame.greengameio.repository.TaskRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.*;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    public final TaskRepository taskRepository;
    private final Validator validator;

    public Task create(@Valid Task task) {
        Errors errors = new BeanPropertyBindingResult(task, "task");
        ValidationUtils.invokeValidator(validator, task, errors);

        if (errors.hasErrors()) {
            throw new TaskValidationException("Task validation failed: " + errors.getAllErrors());
        }

        try {
            return taskRepository.save(task);
        } catch (DataIntegrityViolationException e) {
            throw new TaskValidationException("Task with the same name already exists. " + e.getMessage());
        }
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    public Task update(Long id, @Valid Task task) {
        Errors errors = new BeanPropertyBindingResult(task, "task");
        ValidationUtils.invokeValidator(validator, task, errors);

        if (errors.hasErrors()) {
            throw new TaskValidationException("Task validation failed: " + errors.getAllErrors());
        }

        Optional<Task> taskFromRepository = taskRepository.findById(id);

        if (taskFromRepository.isEmpty()) {
            throw new TaskNotFoundException("Task not found");
        }

        return taskRepository.save(task);
    }

    public List<Task> get() {
        return taskRepository.findAll();
    }

    public Task getById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task not found"));
    }
}
