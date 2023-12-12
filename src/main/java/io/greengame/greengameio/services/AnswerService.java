package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Answer;
import io.greengame.greengameio.exceptions.answer.AnswerNotFoundException;
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

    public Answer getAnswer(Long answerID) throws AnswerNotFoundException {
        return answerRepository.findById(answerID).orElseThrow(() -> new AnswerNotFoundException("Answer with given ID could not be found in the database."));
    }

    // Update

    public void updateAnswer(Answer answer) {
        answerRepository.save(answer);
    }

    // Delete

    public void deleteAnswer(Answer answer) {
        answerRepository.delete(answer);
    }
}
