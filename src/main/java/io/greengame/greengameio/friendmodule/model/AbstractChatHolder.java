package io.greengame.greengameio.friendmodule.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@ToString
@EqualsAndHashCode
public abstract class AbstractChatHolder {
    @Id
    private String id;
    private Chat chat;
}
