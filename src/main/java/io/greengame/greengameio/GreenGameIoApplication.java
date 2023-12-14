package io.greengame.greengameio;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserNotification;
import io.greengame.greengameio.entity.UserType;
import io.greengame.greengameio.repository.NotificationRepository;
import io.greengame.greengameio.repository.UserNotificationRepository;
import io.greengame.greengameio.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class GreenGameIoApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenGameIoApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, NotificationRepository notificationRepository, UserNotificationRepository userNotificationRepository) {
        return args -> {
            //password is password
            var user1 = userRepository.save(new User("admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com", UserType.ADMINISTRATOR));
            var user2 = userRepository.save(new User("user", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user@email.com", UserType.USER));
            notificationRepository.save(new Notification("Title1", "Content1"));
            notificationRepository.save(new Notification("Title2", "Content2"));
            notificationRepository.save(new Notification("Title3", "Content3"));
            userNotificationRepository.save(new UserNotification("UserTitle1", "UserContent1",true, user1));
            userNotificationRepository.save(new UserNotification("UserTitle2", "UserContent2",true, user1));
            userNotificationRepository.save(new UserNotification("UserTitle3", "UserContent3",false, user1));
            userNotificationRepository.save(new UserNotification("UserTitle11", "UserContent11",true, user2));
            userNotificationRepository.save(new UserNotification("UserTitle12", "UserContent12",false, user2));
            userNotificationRepository.save(new UserNotification("UserTitle13", "UserContent13",true, user2));
            userNotificationRepository.save(new UserNotification("UserTitle14", "UserContent14",false, user2));
        };
    }

}
