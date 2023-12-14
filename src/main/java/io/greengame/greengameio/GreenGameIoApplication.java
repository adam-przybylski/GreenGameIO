package io.greengame.greengameio;

import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserOdznaka;
import io.greengame.greengameio.entity.UserType;
import io.greengame.greengameio.repository.OdznakaRepository;
import io.greengame.greengameio.repository.UserOdznakaRepository;
import io.greengame.greengameio.repository.UserRepository;
import io.greengame.greengameio.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;

@SpringBootApplication
public class GreenGameIoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenGameIoApplication.class, args);
	}



	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository, OdznakaRepository odznakaRepository, UserOdznakaRepository userOdznakaRepository) {
		return args -> {
			//password is password
			odznakaRepository.save(new Odznaka(1L, "nazwa1",  "opis1", "test1.png"));//, new HashSet<Long>()));
			odznakaRepository.save(new Odznaka(2L, "nazwa2", "opis2", "test2.png"));//, new HashSet<Long>()));
			odznakaRepository.save(new Odznaka(3L, "nazwa3", "opis3", "test3.png"));
			odznakaRepository.save(new Odznaka(4L, "nazwa4", "opis4", "test4.png"));
			odznakaRepository.save(new Odznaka(5L, "nazwa5", "opis5", "test5.png"));
			odznakaRepository.save(new Odznaka(6L, "nazwa6", "opis6", "test6.png"));
			odznakaRepository.save(new Odznaka(7L, "nazwa7", "opis7", "test7.png"));

			userRepository.save(new User("admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com", UserType.ADMINISTRATOR));//, new HashSet<Long>()));
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
			//5 dajemy 2
			/*

			 */
		};
	}

}
