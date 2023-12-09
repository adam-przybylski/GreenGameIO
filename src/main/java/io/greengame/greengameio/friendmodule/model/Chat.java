package io.greengame.greengameio.friendmodule.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document
public class Chat {
    @Id
    private String id;
    private ArrayList<Message> messages;
}
