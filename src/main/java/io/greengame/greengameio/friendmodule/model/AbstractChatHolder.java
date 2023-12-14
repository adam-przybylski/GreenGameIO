package io.greengame.greengameio.friendmodule.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@EqualsAndHashCode
public abstract class AbstractChatHolder {
    @Id
    private String id;
    private String chatId;
    private Map<Long,String> members = new HashMap<>();
}
