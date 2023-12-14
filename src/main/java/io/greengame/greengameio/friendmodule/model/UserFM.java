package io.greengame.greengameio.friendmodule.model;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Data
@Document
public class UserFM {
    private Long id;
    private String username;
    private ArrayList<String> friends = new ArrayList<>();
    private ArrayList<String> groups = new ArrayList<>();
    private Map<Long,String> friendRequests = new HashMap<>();
}
