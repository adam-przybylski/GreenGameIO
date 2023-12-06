package io.greengame.greengameio.friendmodule.repositories;

import io.greengame.greengameio.friendmodule.model.AbstractChatHolder;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AbstractChatHolderRepository extends MongoRepository<AbstractChatHolder, String> {
}
