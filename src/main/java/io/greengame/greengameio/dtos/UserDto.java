package io.greengame.greengameio.dtos;

import io.greengame.greengameio.entity.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String login;
    private String token;
    private UserType userType;

    public UserDto(Long id, String email, String login, UserType userType) {
        this.id = id;
        this.email = email;
        this.login = login;
        this.userType = userType;
    }
}
