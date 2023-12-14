package io.greengame.greengameio.seeder;

import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserType;
import io.greengame.greengameio.repository.TaskRepository;
import io.greengame.greengameio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@Profile("test")
@RequiredArgsConstructor
public class TestDataTasksSeeder {
    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    private static final List<Task> tasks = new ArrayList<>();

    @Bean
    public CommandLineRunner initTestData() {
        tasks.clear();

        Task sampleTask = new Task(null,"Sample Task", "Sample Description", 10, true);
        Task sampleTaskInactive = new Task(null,"Sample Task2", "Sample Description", 10, false);
        User admin = new User(1L, "admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com", UserType.ADMINISTRATOR);
        User user = new User(2L, "user", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user@email.com", UserType.USER);

        return args -> {
            userRepository.save(admin);
            userRepository.save(user);

            taskRepository.save(sampleTask);
            taskRepository.save(sampleTaskInactive);

            tasks.add(sampleTask);
            tasks.add(sampleTaskInactive);
        };
    }

    public static List<Task> getTasks() {
        return Collections.unmodifiableList(tasks);
    }
}
