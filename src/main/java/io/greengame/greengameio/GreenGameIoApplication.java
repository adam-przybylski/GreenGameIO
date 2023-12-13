package io.greengame.greengameio;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserType;
import io.greengame.greengameio.friendmodule.dto.GroupUpdateDTO;
import io.greengame.greengameio.friendmodule.managers.FriendManager;
import io.greengame.greengameio.friendmodule.model.Group;
import io.greengame.greengameio.repository.UserRepository;
import io.greengame.greengameio.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
public class GreenGameIoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenGameIoApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(FriendManager friendManager, UserService userService) {
		return args -> {
			//password is password
			User user1 = userService.createUser(new User( "admin", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "admin@email.com", UserType.ADMINISTRATOR));
			User user2 = userService.createUser(new User( "user", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "user@email.com", UserType.USER));
			User user3 = userService.createUser(new User( "user11", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "mail1@email.com", UserType.USER));
			User user4 = userService.createUser(new User( "pudzian", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "polakpudzian@email.com", UserType.USER));
			User user5 =userService.createUser(new User( "malysz", "$2b$12$6J4h6z.Er73Ud7zWhUT4yueCCFl2xCLkUZGHi8JtJYYwxp3NHtbBK", "malysz@git.com", UserType.USER));
			friendManager.sendFriendRequest(user2.getId(), user3.getId());
			friendManager.sendFriendRequest(user2.getId(), user4.getId());
			friendManager.acceptFriendRequest(user2.getId(), user3.getId());
			friendManager.acceptFriendRequest(user2.getId(), user4.getId());
			friendManager.sendFriendRequest(user2.getId(), user5.getId());
			GroupUpdateDTO groupUpdateDTO = new GroupUpdateDTO("grupa testowa opis","GrupTest",user2.getId());
			Group group = friendManager.createGroup(user2.getId(), groupUpdateDTO);
			friendManager.addGroupMember(user2.getId(), group.getId(), user3.getId());
			friendManager.addGroupMember(user2.getId(), group.getId(), user4.getId());
			friendManager.addGroupMember(user2.getId(), group.getId(), user5.getId());

		};
	}

}
