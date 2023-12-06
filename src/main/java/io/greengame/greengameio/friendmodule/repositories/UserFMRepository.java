package io.greengame.greengameio.friendmodule.repositories;

import io.greengame.greengameio.friendmodule.model.UserFM;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserFMRepository extends MongoRepository<UserFM, Long> {
}
