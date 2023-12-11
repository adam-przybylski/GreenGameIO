package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Answer;
import io.greengame.greengameio.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    // Create

    public void createAnswer(Answer answer) {
        answerRepository.save(answer);
    }

    // Read

    public Answer getAnswer(Long answerID) {
        return answerRepository.findById(answerID).orElseThrow(() -> new RuntimeException("Answer with given ID could not be found in the database."));
    }

    // Update

    public void updateAnswer(Answer answer) {
        Answer answerFromDB = answerRepository.findById(answer.getAnswerID()).orElseThrow(() -> new RuntimeException("Answer with given ID could not be found in the database."));
        answerFromDB.setAnswerContent(answer.getAnswerContent());
        answerRepository.save(answerFromDB);
    }

    // Delete

    public void deleteAnswer(Answer answer) {
        answerRepository.delete(answer);
    }
}
