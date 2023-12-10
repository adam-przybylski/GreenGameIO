package io.greengame.greengameio.friendmodule.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Group extends AbstractChatHolder{
    private String name;
    private List<Long> members;
    private String description;
    private Long ownerId;
}
