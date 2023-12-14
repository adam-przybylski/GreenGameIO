package io.greengame.greengameio.friendmodule.repositories;

import io.greengame.greengameio.friendmodule.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, String> {
}
