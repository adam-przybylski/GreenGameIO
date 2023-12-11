package io.greengame.greengameio.friendmodule.dto;

public record GroupUpdateDTO(
        String description,
        String name,
        Long ownerId
) {
}
