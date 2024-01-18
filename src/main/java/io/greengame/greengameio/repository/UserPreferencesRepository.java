package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPreferencesRepository extends JpaRepository<UserPreferences, Long> {
    Optional<UserPreferences> findByUser(User user);
}
