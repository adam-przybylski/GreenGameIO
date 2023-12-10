package io.greengame.greengameio.friendmodule.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Friend extends AbstractChatHolder {
    private Long friendId;
}
