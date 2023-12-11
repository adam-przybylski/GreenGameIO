package io.greengame.greengameio;

import io.greengame.greengameio.entity.*;
import io.greengame.greengameio.repository.*;
import io.greengame.greengameio.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class GreenGameIoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenGameIoApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository, QuizRepository quizRepository, QuestionRepository questionRepository,
										AnswerRepository answerRepository, HiScoreRepository highScoreRepository) {
		return args -> {
			//password is password
			User admin = userRepository.save(new User(1L, "admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com", UserType.ADMINISTRATOR));
			User user = userRepository.save(new User(2L, "user", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user@email.com", UserType.USER));

			Answer answerNo1 = new Answer("Prawda");
			Answer answerNo2 = new Answer("Fałsz");
			Question question = new Question("Recykling papieru jest korzystny dla środowiska, ponieważ pomaga ograniczyć wycinkę drzew.", 1, List.of(answerNo1, answerNo2), answerNo1);
			Quiz quiz = new Quiz("Quiz testowy", 1, admin, LocalDateTime.now().minusDays(1), List.of(question));

			answerRepository.save(answerNo1);
			answerRepository.save(answerNo2);
			questionRepository.save(question);
			quizRepository.save(quiz);

			HiScore hiScore = new HiScore(quiz, user, 0);
			highScoreRepository.save(hiScore);
		};
	}

}
