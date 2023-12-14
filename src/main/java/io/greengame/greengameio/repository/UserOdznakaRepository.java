package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.UserOdznaka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserOdznakaRepository extends JpaRepository<UserOdznaka, Long> {
    List<UserOdznaka> findByUserId(Long id);
    List<UserOdznaka> findByOdznakaId(Long id);
}
