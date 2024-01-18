package io.greengame.greengameio.friendmodule.endpoints;

import io.greengame.greengameio.friendmodule.managers.FriendManager;
import io.greengame.greengameio.friendmodule.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class Messenger {
    private final FriendManager friendManager;

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/{chatId}")
    public Message sendMessage(Message message, @DestinationVariable String chatId) {
        return friendManager.sendMessage(chatId, message);
    }
}
