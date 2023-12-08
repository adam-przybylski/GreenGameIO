package io.greengame.greengameio.friendmodule.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
public class Message {
    private Long senderID;
    private LocalDateTime timestamp;
    private String content;
}
