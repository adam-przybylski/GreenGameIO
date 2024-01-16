package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserTask;
import io.greengame.greengameio.exceptions.TaskNotFoundException;
import io.greengame.greengameio.repository.UserRepository;
import io.greengame.greengameio.repository.UserTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class UserTaskService {
    private final UserTaskRepository userTaskRepository;
    private final TaskService taskService;
    private final UserService userService;
    private final GameResultService gameResultService;
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

    @Transactional
    public List<UserTask> getAllUserTasks(Long userId) {
        return userTaskRepository.findByUserId(userId);
    }

    @Transactional
    public List<UserTask> getAllActiveUserTasks(Long userId) {
        return  userTaskRepository.findByUserIdAndActiveTrue(userId);
    }

    public UserTask getById(Long id) {
        return userTaskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("UserTask not found"));
    }



    public void generateUserTasksForAllUsers() {
        List<User> allUsers = userService.getUsers();
        List<Task> allTasks = taskService.get();

        for (User user : allUsers) {
            Set<Long> chosenTaskIds = new HashSet<>();

            for (int i = 0; i < 3; i++) {
                Task randomTask = getRandomTask(allTasks, chosenTaskIds);

                UserTask userTask = new UserTask();
                userTask.setTask(randomTask);
                userTask.setUser(user);
                userTask.setActive(true);
                userTask.setDone(false);

                userTaskRepository.save(userTask);
            }
        }
    }

    public void generateUserTasksForUser(Long userId) {
        List<Task> allTasks = taskService.get();
        Set<Long> chosenTaskIds = new HashSet<>();

        for (int i = 0; i < 3; i++) {
            Task randomTask = getRandomTask(allTasks, chosenTaskIds);

            UserTask userTask = new UserTask();
            userTask.setTask(randomTask);
            userTask.setUser(userService.getUserById(userId));
            userTask.setActive(true);
            userTask.setDone(false);

            userTaskRepository.save(userTask);
        }
    }

    private Task getRandomTask(List<Task> tasks, Set<Long> chosenTaskIds) {
        List<Task> remainingTasks = new ArrayList<>(tasks);

        remainingTasks.removeIf(task -> chosenTaskIds.contains(task.getId()));

        if (remainingTasks.isEmpty()) {
            chosenTaskIds.clear();
            remainingTasks.addAll(tasks);
        }

        Collections.shuffle(remainingTasks);

        Task randomTask = remainingTasks.isEmpty() ? null : remainingTasks.get(0);

        if (randomTask != null) {
            chosenTaskIds.add(randomTask.getId());
        }

        return randomTask;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void generateUserTasksAtMidnight() {
        deactivateAllActiveTasks();

        generateUserTasksForAllUsers();
    }


    private void deactivateAllActiveTasks() {
        List<UserTask> allActiveTasks = getAllActiveTasks();

        for (UserTask userTask : allActiveTasks) {
            userTask.setActive(false);
            userTaskRepository.save(userTask);
        }
    }

    public void completeTask(Long id) {
        Optional<UserTask> taskFromRepository = userTaskRepository.findById(id);

        if (taskFromRepository.isEmpty()) {
            throw new TaskNotFoundException("Task not found");
        }

        User user = taskFromRepository.get().getUser();

        gameResultService.updateUserXP(user.getId(), taskFromRepository.get().getTask().getExpValue());

        taskFromRepository.get().setDone(true);
        userTaskRepository.save(taskFromRepository.get());
    }
}
