package io.greengame.greengameio.repository;

import io.greengame.greengameio.entity.Question;
import io.greengame.greengameio.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
