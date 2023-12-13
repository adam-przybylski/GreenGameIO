package io.greengame.greengameio;

import io.greengame.greengameio.entity.GameResult;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserType;
import io.greengame.greengameio.repository.GameResultRepository;
import io.greengame.greengameio.repository.UserRepository;
import io.greengame.greengameio.services.GameResultService;
import io.greengame.greengameio.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GreenGameIoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenGameIoApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository, GameResultService gameResultService) {
		return args -> {
			//password is password
				userRepository.save(new User(1L, "admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com", UserType.ADMINISTRATOR));
				userRepository.save(new User(2L, "user", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user@email.com", UserType.USER));

			gameResultService.updateSnakeResult(1L,1);
			gameResultService.updateUserXP(1L,69);
			gameResultService.updateLightsOutResult(1L,32);
			gameResultService.updateSnakeResult(1L,2);



		};
	}

}
