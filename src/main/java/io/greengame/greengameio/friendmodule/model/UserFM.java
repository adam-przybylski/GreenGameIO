package io.greengame.greengameio.friendmodule.model;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document
public class UserFM {
    private Long id;
    private ArrayList<String> friends = new ArrayList<>();
    private ArrayList<String> groups = new ArrayList<>();
    private ArrayList<Long> friendRequests = new ArrayList<>();
}
