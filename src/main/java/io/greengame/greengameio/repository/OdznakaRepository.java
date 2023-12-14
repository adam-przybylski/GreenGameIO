package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.Odznaka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OdznakaRepository extends JpaRepository<Odznaka, Long> {

    Optional<Odznaka> findByNazwa(String name);
}
