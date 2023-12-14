package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    List<UserNotification> findAllByUser(User user);
    List<UserNotification> findAllByUserAndSended(User user, Boolean sended);
}
