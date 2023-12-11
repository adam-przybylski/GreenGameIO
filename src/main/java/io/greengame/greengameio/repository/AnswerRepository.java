package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.Answer;
import io.greengame.greengameio.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

}
