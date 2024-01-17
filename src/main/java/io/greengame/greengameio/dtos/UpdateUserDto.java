package io.greengame.greengameio.dtos;

import io.greengame.greengameio.entity.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UpdateUserDto {
    Long id;
    String email;
    String username;
    UserType type;
}
