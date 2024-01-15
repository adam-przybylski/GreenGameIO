package io.greengame.greengameio;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.friendmodule.dto.GroupUpdateDTO;
import io.greengame.greengameio.friendmodule.managers.FriendManager;
import io.greengame.greengameio.friendmodule.model.Group;
import io.greengame.greengameio.repository.*;
import io.greengame.greengameio.services.GameResultService;
import io.greengame.greengameio.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
@EnableScheduling
public class GreenGameIoApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenGameIoApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository,
                                        NotificationRepository notificationRepository,
                                        UserNotificationRepository userNotificationRepository,
                                        GameResultService gameResultService,
                                        AnswerRepository answerRepository,
                                        QuestionRepository questionRepository,
                                        QuizRepository quizRepository,
                                        HiScoreRepository highScoreRepository,
                                        FriendManager friendManager,
                                        UserService userService,
                                        UserOdznakaRepository userOdznakaRepository,
                                        OdznakaRepository odznakaRepository) {
        return args -> {
            //password is password
            var admin = userService.createUser(new User("admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com",
                    UserType.ADMINISTRATOR));
            var user = userService.createUser(new User("user", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user@email.com",
                    UserType.USER));
            User user3 = userService.createUser(new User("user11", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "mail1@email" +
                    ".com", UserType.USER));
            User user4 = userService.createUser(new User("pudzian", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "polakpudzian" +
                    "@email.com", UserType.USER));
            User user5 = userService.createUser(new User("malysz", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "malysz@git.com"
                    , UserType.USER));

            notificationRepository.save(new Notification("Title1", "Content1"));
            notificationRepository.save(new Notification("Title2", "Content2"));
            notificationRepository.save(new Notification("Title3", "Content3"));
            userNotificationRepository.save(new UserNotification("UserTitle1", "UserContent1", true, admin));
            userNotificationRepository.save(new UserNotification("UserTitle2", "UserContent2", true, admin));
            userNotificationRepository.save(new UserNotification("UserTitle3", "UserContent3", false, admin));
            userNotificationRepository.save(new UserNotification("UserTitle11", "UserContent11", true, user));
            userNotificationRepository.save(new UserNotification("UserTitle12", "UserContent12", false, user));
            userNotificationRepository.save(new UserNotification("UserTitle13", "UserContent13", true, user));
            userNotificationRepository.save(new UserNotification("UserTitle14", "UserContent14", false, user));
            gameResultService.updateSnakeResult(1L, 1);
            gameResultService.updateUserXP(1L, 69);
            gameResultService.updateLightsOutResult(1L, 32);
            gameResultService.updateSnakeResult(1L, 2);
            friendManager.sendFriendRequest(user.getId(), user3.getId());
            friendManager.sendFriendRequest(user.getId(), user4.getId());
            friendManager.acceptFriendRequest(user.getId(), user3.getId());
            friendManager.acceptFriendRequest(user.getId(), user4.getId());
            friendManager.sendFriendRequest(user.getId(), user5.getId());
            GroupUpdateDTO groupUpdateDTO = new GroupUpdateDTO("grupa testowa opis", "GrupTest", user.getId());
            Group group = friendManager.createGroup(user.getId(), groupUpdateDTO);
            friendManager.addGroupMember(user.getId(), group.getId(), user3.getId());
            friendManager.addGroupMember(user.getId(), group.getId(), user4.getId());
            friendManager.addGroupMember(user.getId(), group.getId(), user5.getId());

            odznakaRepository.save(new Odznaka(1L, "nazwa1", "opis1", "test1.png"));//, new HashSet<Long>()));
            odznakaRepository.save(new Odznaka(2L, "nazwa2", "opis2", "test2.png"));//, new HashSet<Long>()));
            odznakaRepository.save(new Odznaka(3L, "nazwa3", "opis3", "test3.png"));
            odznakaRepository.save(new Odznaka(4L, "nazwa4", "opis4", "test4.png"));
            odznakaRepository.save(new Odznaka(5L, "nazwa5", "opis5", "test5.png"));
            odznakaRepository.save(new Odznaka(6L, "nazwa6", "opis6", "test6.png"));
            odznakaRepository.save(new Odznaka(7L, "nazwa7", "opis7", "test7.png"));


            userRepository.save(new User("user1", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user1@email.com", UserType.USER));//, new HashSet<Long>()));
            userRepository.save(new User("user2", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user2@email.com", UserType.USER));
            userRepository.save(new User("user3", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user3@email.com", UserType.USER));
            userRepository.save(new User("user4", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user4@email.com", UserType.USER));
            userRepository.save(new User("user5", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user5@email.com", UserType.USER));

            userOdznakaRepository.save(new UserOdznaka(1L, 1L));
            userOdznakaRepository.save(new UserOdznaka(2L, 1L));
            userOdznakaRepository.save(new UserOdznaka(3L, 1L));
            userOdznakaRepository.save(new UserOdznaka(4L, 1L));
            userOdznakaRepository.save(new UserOdznaka(5L, 1L));
            userOdznakaRepository.save(new UserOdznaka(6L, 1L));
            userOdznakaRepository.save(new UserOdznaka(7L, 1L));
            userOdznakaRepository.save(new UserOdznaka(2L, 2L));
            userOdznakaRepository.save(new UserOdznaka(7L, 3L));
            userOdznakaRepository.save(new UserOdznaka(6L, 3L));

            Answer answerNo1ForQ1 = new Answer("Prawda");
            Answer answerNo2ForQ1 = new Answer("Fałsz");
            Question questionNo1 = new Question("Recykling papieru jest korzystny dla środowiska, ponieważ pomaga ograniczyć wycinkę drzew.", 1,
                    List.of(answerNo1ForQ1, answerNo2ForQ1), answerNo1ForQ1);

            Answer answerNo1ForQ2 = new Answer("Transport");
            Answer answerNo2ForQ2 = new Answer("Energia odnawialna");
            Answer answerNo3ForQ2 = new Answer("Górnictwo");
            Answer answerNo4ForQ2 = new Answer("Przemysł spożywczy");
            Question questionNo2 = new Question("Jakie jest główne źródło emisji dwutlenku węgla związane z działalnością człowieka?", 2,
                    List.of(answerNo1ForQ2, answerNo2ForQ2, answerNo3ForQ2, answerNo4ForQ2), answerNo1ForQ2);

            Answer answerNo1ForQ3 = new Answer("Prawda");
            Answer answerNo2ForQ3 = new Answer("Fałsz");
            Question questionNo3 = new Question("Energia słoneczna jest odnawialnym źródłem energii.", 3, List.of(answerNo1ForQ3, answerNo2ForQ3),
                    answerNo1ForQ3);

            Answer answerNo1ForQ4 = new Answer("Emisje gazów cieplarnianych i wylesianie");
            Answer answerNo2ForQ4 = new Answer("Nadmierna konsumpcja czekolady");
            Question questionNo4 = new Question("Jakie są główne przyczyny zmian klimatu?", 4, List.of(answerNo1ForQ4, answerNo2ForQ4),
                    answerNo1ForQ4);

            Answer answerNo1ForQ5 = new Answer("Hodowanie roślin w domu");
            Answer answerNo2ForQ5 = new Answer("Recykling i używanie przedmiotów wielokrotnego użytku");
            Question questionNo5 = new Question("W jaki sposób możemy ograniczyć zużycie plastiku?", 5, List.of(answerNo1ForQ5, answerNo2ForQ5),
                    answerNo2ForQ5);


            Quiz quiz = new Quiz("QuizTestowy", 3, admin, LocalDateTime.now().minusDays(1), List.of(questionNo1, questionNo2, questionNo3));
            Quiz quiz2 = new Quiz("QuizTestowy2", 2, admin, LocalDateTime.now().plusDays(30), List.of(questionNo4, questionNo5));

            answerRepository.saveAll(List.of(answerNo1ForQ1, answerNo2ForQ1,
                    answerNo1ForQ2, answerNo2ForQ2, answerNo3ForQ2, answerNo4ForQ2,
                    answerNo1ForQ3, answerNo2ForQ3, answerNo1ForQ4, answerNo2ForQ4, answerNo1ForQ5, answerNo2ForQ5));
            questionRepository.saveAll(List.of(questionNo1, questionNo2, questionNo3, questionNo4, questionNo5));
            quizRepository.save(quiz);
            quizRepository.save(quiz2);

            HiScore hiScore = new HiScore(quiz, user, 1);
            HiScore hiScore2 = new HiScore(quiz2, user, 2);
            highScoreRepository.save(hiScore);
            highScoreRepository.save(hiScore2);
        };
    }


}
