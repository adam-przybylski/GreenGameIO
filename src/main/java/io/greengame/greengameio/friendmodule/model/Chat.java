package io.greengame.greengameio.friendmodule.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Chat {
    @Id
    String id;
    ArrayList<Message> messages = new ArrayList<>();
}
