package io.greengame.greengameio.friendmodule.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Group extends AbstractChatHolder{
    private String name;
    private String description;
    private Long ownerId;
}
