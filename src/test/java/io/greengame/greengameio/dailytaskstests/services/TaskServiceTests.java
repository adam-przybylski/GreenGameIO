package io.greengame.greengameio.dailytaskstests.services;

import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.exceptions.TaskNotFoundException;
import io.greengame.greengameio.exceptions.TaskValidationException;
import io.greengame.greengameio.services.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TaskServiceTests {

    @Autowired
    private TaskService taskService;

    Task sampleTask = new Task(null,"Sample Task", "Sample Description", 10, true);
    Task sampleTaskInactive = new Task(null,"Sample Task2", "Sample Description", 10, false);
    @BeforeEach
    public void setup() {
        taskService.create(sampleTask);
        taskService.create(sampleTaskInactive);
    }

    @Test
    @DisplayName("Test getById() should return correct Task entity for correct id")
    public void test_GetById_ShouldReturn_CorrectTaskEntity_ForCorrectId() {
        assertDoesNotThrow(() -> taskService.getById(sampleTask.getId()));

        Task result = taskService.getById(sampleTask.getId());

        assertEquals(result.getId(), sampleTask.getId());
        assertEquals(result.getName(), sampleTask.getName());
    }

    @Test
    @DisplayName("Test getById() should throw TaskNotFundExceptions for wrong id")
    public void test_GetById_ShouldThrow_TaskNotFund_ForWrongId() {
        Long randomId = ThreadLocalRandom.current().nextLong(Long.MAX_VALUE);

        assertThrows(TaskNotFoundException.class, () -> taskService.getById(randomId), "Task not found");
    }

    @Test
    @DisplayName("Test get() should return Task entity list")
    public void test_Get_ShouldReturn_TaskEntityList() {
        List<Task> taskList = taskService.get();

        assertEquals(taskList.size(), 2);
        assertTrue(taskList.contains(sampleTask));
        assertTrue(taskList.contains(sampleTaskInactive));
    }

    @Test
    @DisplayName("Test create() should persists Task entity to repository for valid Task entity")
    public void test_Create_ShouldPersists_TaskEntityToRepository_ForValidTaskEntity() {
        Task testTask = new Task(null,"Test Task", "Sample Description", 10, true);

        assertDoesNotThrow(() -> taskService.create(testTask));

        Task result = taskService.getById(testTask.getId());

        assertEquals(result.getId(), testTask.getId());
        assertEquals(result.getName(), testTask.getName());
        assertEquals(result.getDescription(), testTask.getDescription());
        assertEquals(result.getExpValue(), testTask.getExpValue());
        assertEquals(result.isActive(), testTask.isActive());
    }

    @Test
    @DisplayName("Test create() should throw TaskValidationException for invalid Task entity")
    public void test_Create_ShouldThrow_TaskValidationException_ForInvalidTaskEntity() {
        Task testTask = new Task(null,"Sample Task", "", -10, true);

        assertThrows(TaskValidationException.class, () -> taskService.create(testTask));
    }

    @Test
    @DisplayName("Test delete() should remove Task entity from repository for correct id")
    public void test_Delete_ShouldRemove_TaskEntityFromRepository_ForCorrectId() {
        assertDoesNotThrow(() -> taskService.getById(sampleTask.getId()));

        taskService.delete(sampleTask.getId());

        assertThrows(TaskNotFoundException.class, () -> taskService.getById(sampleTask.getId()), "Task not found");
    }

    @Test
    @DisplayName("Test update() should update Task entity in repository for valid Id and Task entity")
    public void test_Update_ShouldUpdate_TaskEntity_ForValidIdAndTaskEntity() {
        sampleTask.setName("Changed Name");
        sampleTask.setDescription("Changed Description");
        sampleTask.setExpValue(15);
        sampleTask.setActive(false);

        assertDoesNotThrow(() -> taskService.update(sampleTask.getId(), sampleTask));

        Task result = taskService.getById(sampleTask.getId());

        assertEquals(result.getName(), sampleTask.getName());
        assertEquals(result.getDescription(), sampleTask.getDescription());
        assertEquals(result.getExpValue(), sampleTask.getExpValue());
        assertEquals(result.isActive(), sampleTask.isActive());
    }

    @Test
    @DisplayName("Test update() should should throw TaskValidationException for Invalid Task entity")
    public void test_Update_ShouldThrow_TaskValidationException_ForInvalidTaskEntity() {
        sampleTask.setName("");
        sampleTask.setDescription("");
        sampleTask.setExpValue(-15);
        sampleTask.setActive(false);

        assertThrows(TaskValidationException.class, () -> taskService.update(sampleTask.getId(), sampleTask));

        Task result = taskService.getById(sampleTask.getId());

        assertNotEquals(result.getName(), sampleTask.getName());
        assertNotEquals(result.getDescription(), sampleTask.getDescription());
        assertNotEquals(result.getExpValue(), sampleTask.getExpValue());
        assertNotEquals(result.isActive(), sampleTask.isActive());
    }

    @Test
    @DisplayName("Test update() should should throw TaskNotFoundException for incorrect id")
    public void test_Update_ShouldThrow_TaskNotFoundException_ForInvalidId() {
        Long randomId = ThreadLocalRandom.current().nextLong(Long.MAX_VALUE);
        sampleTask.setName("Changed Name");
        sampleTask.setDescription("Changed Description");
        sampleTask.setExpValue(15);
        sampleTask.setActive(false);


        assertThrows(TaskNotFoundException.class, () -> taskService.update(randomId, sampleTask));

        Task result = taskService.getById(sampleTask.getId());

        assertNotEquals(result.getName(), sampleTask.getName());
        assertNotEquals(result.getDescription(), sampleTask.getDescription());
        assertNotEquals(result.getExpValue(), sampleTask.getExpValue());
        assertNotEquals(result.isActive(), sampleTask.isActive());
    }
}
