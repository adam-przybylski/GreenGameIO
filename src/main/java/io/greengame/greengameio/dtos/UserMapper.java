package io.greengame.greengameio.dtos;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserType;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto toUserDto(User user) {
        return new UserDto(user.getId(), user.getEmail(), user.getUsername(), user.getType());
    }

    public User signUpToUser(SignUpDto signUpDto) {
        return new User(signUpDto.getLogin(), new String(signUpDto.getPassword()), signUpDto.getEmail(), UserType.USER);
    }
}
