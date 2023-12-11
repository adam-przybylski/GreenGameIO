package io.greengame.greengameio.dailytaskstests.controllers;

import io.greengame.greengameio.entity.Task;
import io.greengame.greengameio.seeder.TestDataTasksSeeder;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class TaskControllerTests {
    private final static String BASE_URI = "http://localhost/api/v1/tasks";

    @LocalServerPort
    private int port;

    @BeforeEach
    public void configureRestAssured() {
        RestAssured.baseURI = BASE_URI;
        RestAssured.port = port;
    }

    @Test
    @DisplayName("Test get() should return HTTP 200 OK and correct amount of data")
    public void test_Get_ShouldReturn_OkHttpStatusAndCorrectAmountOfData() {
        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .when()
                .get()
                .then()
                .assertThat()
                .contentType(ContentType.JSON)
                .body("size()", is(2))
                .statusCode(HttpStatus.OK.value());
    }


    @Test
    @DisplayName("Test getById() should return HTTP 200 OK and correct Task entity for correct id")
    public void test_Get_ShouldReturn_OkHttpStatusAndCorrectTaskEntity_ForCorrectId() {
        List<Task> testTasks = TestDataTasksSeeder.getTasks();
        Task task = testTasks.get(0);

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", task.getId())
                .when()
                .get("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("id", equalTo(task.getId().intValue()))
                .body("name", equalTo(task.getName()))
                .body("description", equalTo(task.getDescription()))
                .body("expValue", equalTo(task.getExpValue()))
                .body("active", equalTo(task.isActive()));
    }

    @Test
    @DisplayName("Test getById() should return HTTP 404 Not Found for incorrect id")
    public void test_Get_ShouldReturn_NotFoundHttpStatus_ForIncorrectId() {
        Long randomId = ThreadLocalRandom.current().nextLong(Long.MAX_VALUE);

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", randomId)
                .when()
                .get("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("Test create() should return HTTP 201 Created for valid Task entity")
    public void test_Create_shouldReturn_CreatedHttpStatus_ForValidTaskEntity() {
        Task testTask = new Task(null,"Test Task", "Sample Description", 10, true);

        given()
            .auth().basic("admin", "password")
            .contentType(ContentType.JSON)
            .body(testTask)
            .when()
            .post()
            .then()
            .assertThat()
            .statusCode(HttpStatus.CREATED.value())
            .body("id", notNullValue())
            .body("name", equalTo(testTask.getName()))
            .body("description", equalTo(testTask.getDescription()))
            .body("expValue", equalTo(testTask.getExpValue()))
            .body("active", equalTo(testTask.isActive()));
    }

    @Test
    @DisplayName("Test create() should return HTTP 400 Bad Request for invalid Task entity")
    public void test_Create_ShouldReturn_BadRequestHttpStatus_ForInvalidTaskEntity() {
        Task testTask = new Task(null,"Test Task", "", -10, true);

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .body(testTask)
                .when()
                .post()
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Test create() should return HTTP 400 Bad Request for Task entity with non unique name")
    public void test_Create_ShouldReturn_BadRequestHttpStatus_ForTaskEntityWithNonUniqueName() {
        Task testTask = new Task(null,"Sample Task", "Sample Description", 10, true);

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .body(testTask)
                .when()
                .post()
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Test update() should return HTTP 200 OK for valid Task entity and correct id")
    public void test_Update_ShouldReturn_OkHttpStatus_ForValidTaskEntityAndCorrectId() {
        List<Task> testTasks = TestDataTasksSeeder.getTasks();
        Task task = testTasks.get(0);

        Task taskToRequest = Task
                .builder()
                .id(task.getId())
                .name("New Name")
                .description("New Description")
                .expValue(25)
                .active(false)
                .build();

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", task.getId())
                .body(taskToRequest)
                .when()
                .put("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("id", equalTo(task.getId().intValue()))
                .body("name", equalTo(taskToRequest.getName()))
                .body("description", equalTo(taskToRequest.getDescription()))
                .body("expValue", equalTo(taskToRequest.getExpValue()))
                .body("active", equalTo(taskToRequest.isActive()));
    }

    @Test
    @DisplayName("Test update() should return HTTP 400 Bad Request for invalid Task entity and correct id")
    public void test_Update_ShouldReturn_BadRequestHttpStatus_ForInvalidTaskEntityAndCorrectId() {
        List<Task> testTasks = TestDataTasksSeeder.getTasks();
        Task task = testTasks.get(0);

        Task taskToRequest = Task
                .builder()
                .id(task.getId())
                .name("Sample Name")
                .description("")
                .expValue(-25)
                .active(false)
                .build();

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", task.getId())
                .body(taskToRequest)
                .when()
                .put("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Test update() should return HTTP 404 Not Found for incorrect id")
    public void test_Update_ShouldReturn_NotFoundHttpStatus_ForIncorrectId() {
        Long randomId = ThreadLocalRandom.current().nextLong(Long.MAX_VALUE);
        List<Task> testTasks = TestDataTasksSeeder.getTasks();
        Task task = testTasks.get(0);

        Task taskToRequest = Task
                .builder()
                .id(task.getId())
                .name("New Name")
                .description("New Description")
                .expValue(25)
                .active(false)
                .build();

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", randomId)
                .body(taskToRequest)
                .when()
                .put("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @DisplayName("Test delete() should return HTTP No Content and delete Task entity from repository")
    public void test_Update_ShouldReturn_NoContentHttpStatusAndDeleteTaskEntityFromRepository() {
        List<Task> testTasks = TestDataTasksSeeder.getTasks();
        Task task = testTasks.get(0);

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", task.getId())
                .when()
                .get("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value());

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", task.getId())
                .when()
                .delete("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NO_CONTENT.value());

        given()
                .auth().basic("admin", "password")
                .contentType(ContentType.JSON)
                .pathParam("id", task.getId())
                .when()
                .get("/{id}")
                .then()
                .assertThat()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }
}
