package io.greengame.greengameio.friendmodule.repositories;

import io.greengame.greengameio.friendmodule.model.UserFM;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserFMRepository extends MongoRepository<UserFM, Long> {
    List<UserFM> findByUsernameContainsIgnoreCase(String username);
}
