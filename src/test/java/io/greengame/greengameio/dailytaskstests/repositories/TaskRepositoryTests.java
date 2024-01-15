package io.greengame.greengameio.dailytaskstests.repositories;

import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TaskRepositoryTests {

    @Autowired
    private TaskRepository taskRepository;

    Task sampleTask = new Task(null,"Sample Task", "Sample Description", 10, true);
    Task sampleTaskInactive = new Task(null,"Sample Task2", "Sample Description", 10, false);
    @BeforeEach
    public void setup() {
        taskRepository.save(sampleTask);
        taskRepository.save(sampleTaskInactive);
    }

    @Test
    @DisplayName("Test findById() should return correct Task entity for correct id")
    public void test_FindById_ShouldReturn_CorrectTaskEntity_ForCorrectId() {
        Optional<Task> result = taskRepository.findById(sampleTask.getId());
        assertTrue(result.isPresent());
        assertEquals(result.get().getId(), sampleTask.getId());
        assertEquals(result.get().getName(), sampleTask.getName());
    }

    @Test
    @DisplayName("Test findAll() should return Task entity list")
    public void test_FindAll_ShouldReturn_TaskEntityList() {
        List<Task> taskList = taskRepository.findAll();
        assertEquals(taskList.size(), 2);
        assertTrue(taskList.contains(sampleTask));
        assertTrue(taskList.contains(sampleTaskInactive));
    }

    @Test
    @DisplayName("Test save() should persist Task entity to repository for valid task entity")
    public void test_Save_ShouldPersist_TaskEntityToRepository_ForValidTaskEntity() {
        Task testTask = new Task(null,"Test Task", "Sample Description", 10, true);
        taskRepository.save(testTask);
        Optional<Task> result = taskRepository.findById(testTask.getId());
        assertTrue(result.isPresent());
        assertEquals(result.get().getId(), testTask.getId());
        assertEquals(result.get().getName(), testTask.getName());
    }
}
