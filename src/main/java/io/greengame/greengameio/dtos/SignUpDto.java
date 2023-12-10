package io.greengame.greengameio.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    @NotBlank
    @NotEmpty
    private String login;

    @NotEmpty
    private char[] password;

    @NotEmpty
    @NotBlank
    private String email;
}
