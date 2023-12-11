package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Question;
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

    public Question getQuestion(Long questionID) {
        return questionRepository.findById(questionID).orElseThrow(() -> new RuntimeException("Question with given ID could not be found in the database."));
    }

    // Update

    public void updateQuestion(Question question) {
        Question questionFromDB = questionRepository.findById(question.getQuestionID()).orElseThrow(() -> new RuntimeException("Question with given ID could not be found in the database."));
        questionRepository.delete(questionFromDB);
        questionRepository.save(question);
    }

    // Delete

    public void deleteQuestion(Question question) {
        questionRepository.delete(question);
    }
}
