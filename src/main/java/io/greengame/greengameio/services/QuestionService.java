package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Question;
import io.greengame.greengameio.exceptions.question.QuestionNotFoundException;
import io.greengame.greengameio.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    // Create

    public void createQuestion(Question question) {
        questionRepository.save(question);
    }

    // Read

    public Question getQuestion(Long questionID) throws QuestionNotFoundException {
        return questionRepository.findById(questionID).orElseThrow(() -> new QuestionNotFoundException("Question with given ID could not be found in the database."));
    }

    // Update

    public void updateQuestion(Question question) {
        questionRepository.save(question);
    }

    // Delete

    public void deleteQuestion(Question question) {
        questionRepository.delete(question);
    }
}
