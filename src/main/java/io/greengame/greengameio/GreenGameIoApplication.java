package io.greengame.greengameio;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.friendmodule.dto.GroupUpdateDTO;
import io.greengame.greengameio.friendmodule.managers.FriendManager;
import io.greengame.greengameio.friendmodule.model.Group;
import io.greengame.greengameio.repository.*;
import io.greengame.greengameio.services.GameResultService;
import io.greengame.greengameio.services.TaskService;
import io.greengame.greengameio.services.UserService;
import io.greengame.greengameio.services.UserTaskService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDateTime;
import java.util.List;

@EnableScheduling
@SpringBootApplication
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
                                        OdznakaRepository odznakaRepository,
                                        TaskService taskService,
                                        UserTaskService userTaskService) {
        return args -> {
            taskService.create(new Task(null,"Wyłącz światło", "Użyj przełącznika, aby wyłączyć światło", 1, true));
            taskService.create(new Task(null,"Posegreguj śmieci", "Wyrzuć śmieci do odpowiednich pojemników", 5, true));
            taskService.create(new Task(null,"Oszczędzaj wodę", "Upewnij się, że w twoim domu nie marnowana jest właśnie woda", 1, true));
            taskService.create(new Task(null,"Umyj się w zimnej wodzie", "Skorzystaj z zimnej wody, aby oszczędzić energię", 2, true));
            taskService.create(new Task(null, "Zbieraj i segreguj makulaturę", "Zbieraj gazety, kartony i inne papierowe produkty, a następnie posegreguj je do odpowiednich pojemników na makulaturę.", 10, true));
            taskService.create(new Task(null, "Sadź drzewa wokół domu", "Zorganizuj akcję sadzenia drzew wokół swojego domu lub w szkolnym ogrodzie, aby przyczynić się do zwiększenia ilości zieleni.", 100, true));
            taskService.create(new Task(null, "Organizuj zbiórki elektrośmieci", "Zachęcaj rodziny i znajomych do oddawania nieużywanych elektronicznych urządzeń do recyklingu poprzez organizowanie zbiórek elektrośmieci.", 1000, true));
            taskService.create(new Task(null, "Stwórz kompostownik", "Rozpocznij projekt kompostowania w ogrodzie szkolnym lub w domu. Zbieraj odpady organiczne i twórz własny kompost.", 500, true));
            taskService.create(new Task(null, "Przeprowadź akcję sprzątania wokół szkoły", "Zorganizuj zespół uczniów do wspólnego sprzątania terenu szkoły i jej otoczenia, usuwając śmieci i dbając o czystość.", 200, true));
            taskService.create(new Task(null, "Opracuj projekt oszczędzania energii w szkole", "Przygotuj prezentację lub plakat z sugestiami dotyczącymi oszczędzania energii w szkole, a następnie podziel się pomysłami z uczniami i nauczycielami.", 50, true));
            taskService.create(new Task(null, "Zbieraj deszczówkę do podlewania roślin", "Zainstaluj beczki na deszczówkę w szkolnym ogrodzie lub w domu i używaj zgromadzonej wody do podlewania roślin zamiast korzystać z wodociągu.", 20, true));
            taskService.create(new Task(null, "Twórz przedmioty z recyklingu", "Zbieraj różne materiały do recyklingu i używaj ich do tworzenia kreatywnych przedmiotów, takich jak ozdoby, biżuteria czy dekoracje.", 15, true));
            taskService.create(new Task(null, "Monitoruj zużycie energii w domu", "Przeprowadź audyt energetyczny w swoim domu, identyfikując obszary, w których można zaoszczędzić energię, np. poprzez wymianę żarówek na energooszczędne.", 30, true));

            //password is password
            var admin = userService.createUser(new User("admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com",
                    UserType.ADMINISTRATOR));
            userTaskService.generateUserTasksForUser(admin.getId());
            UserTask task = userTaskService.getAllActiveUserTasks(admin.getId()).get(0);
            userTaskService.completeTask(task.getId());
            var user = userService.createUser(new User("user", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user@email.com",
                    UserType.USER));
            userTaskService.generateUserTasksForUser(user.getId());
            UserTask task2 = userTaskService.getAllActiveUserTasks(user.getId()).get(0);
            userTaskService.completeTask(task.getId());
            User user3 = userService.createUser(new User("user11", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "mail1@email" +
                    ".com", UserType.USER));
            userTaskService.generateUserTasksForUser(user3.getId());
            User user4 = userService.createUser(new User("pudzian", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "polakpudzian" +
                    "@email.com", UserType.USER));
            userTaskService.generateUserTasksForUser(user4.getId());
            User user5 = userService.createUser(new User("malysz", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "malysz@git.com"
                    , UserType.USER));
            userTaskService.generateUserTasksForUser(user5.getId());

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


            User user6 = userRepository.save(new User("user1", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user1@email.com", UserType.USER));//, new HashSet<Long>()));
            userTaskService.generateUserTasksForUser(user6.getId());
            User user7 = userRepository.save(new User("user2", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user2@email.com", UserType.USER));
            userTaskService.generateUserTasksForUser(user7.getId());
            User user8 = userRepository.save(new User("user3", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user3@email.com", UserType.USER));
            userTaskService.generateUserTasksForUser(user8.getId());
            User user9 = userRepository.save(new User("user4", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user4@email.com", UserType.USER));
            userTaskService.generateUserTasksForUser(user9.getId());
            User user10 = userRepository.save(new User("user5", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user5@email.com", UserType.USER));
            userTaskService.generateUserTasksForUser(user10.getId());

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

            userTaskService.generateUserTasksAtMidnight();
        };
    }


}
