package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("SELECT b FROM Notification b WHERE TYPE(b) = Notification")
    List<Notification> findAll();
}
