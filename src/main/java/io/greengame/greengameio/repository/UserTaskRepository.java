package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTaskRepository extends JpaRepository<UserTask, Long> {
    List<UserTask> findByActiveTrue();
    List<UserTask> findByUserId(Long userId);
    List<UserTask> findByUserIdAndActiveTrue(Long userId);
}
