package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserTask;
import io.greengame.greengameio.exceptions.TaskNotFoundException;
import io.greengame.greengameio.repository.UserTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserTaskService {
    public final UserTaskRepository userTaskRepository;

    public UserTask create(UserTask userTask) {
        return userTaskRepository.save(userTask);
    }

    public void delete(Long id) {
        userTaskRepository.deleteById(id);
    }

    public UserTask update(Long id, UserTask userTask) {
        Optional<UserTask> taskFromRepository = userTaskRepository.findById(id);

        if (taskFromRepository.isEmpty()) {
            throw new TaskNotFoundException("Task not found");
        }

        return userTaskRepository.save(userTask);
    }

    public List<UserTask> getAllActiveTasks() {
        return userTaskRepository.findByActiveTrue();
    }

    public List<UserTask> getAllUserTasks(Long userId) {
        return userTaskRepository.findByUserId(userId);
    }

    public List<UserTask> getAllActiveUserTasks(Long userId) {
        return  userTaskRepository.findByUserIdAndActiveTrue(userId);
    }

    public UserTask getById(Long id) {
        return userTaskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("UserTask not found"));
    }
}
