package io.greengame.greengameio.dtos.quizzes.mappers;

import io.greengame.greengameio.dtos.quizzes.output_dtos.AnswerCorrectOutputDTO;
import io.greengame.greengameio.dtos.quizzes.input_dtos.AnswerInputDTO;
import io.greengame.greengameio.dtos.quizzes.input_dtos.QuestionInputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuestionWithCorrectAnswersOutputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.AnswerOutputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuestionOutputDTO;
import io.greengame.greengameio.entity.Answer;
import io.greengame.greengameio.entity.Question;

import java.util.ArrayList;
import java.util.List;

public class QuestionMapper {

    public static Question toQuestion(QuestionInputDTO questionInputDTO, int questionNumber) {
        List<Answer> listOfAnswers = new ArrayList<>();
        List<AnswerInputDTO> listOfAnswerInputDTOs = questionInputDTO.getListOfAnswers();
        for (int i = 0; i < listOfAnswerInputDTOs.size(); i++) {
            listOfAnswers.add(AnswerMapper.toAnswer(listOfAnswerInputDTOs.get(i), i + 1));
        }
        return new Question(questionInputDTO.getQuestionContent(), questionNumber, listOfAnswers);
    }

    public static QuestionOutputDTO toQuestionOutputDTO(Question question) {
        List<AnswerOutputDTO> listOfAnswerOutputDTOs = new ArrayList<>();
        for (Answer answer : question.getListOfAnswers()) {
            listOfAnswerOutputDTOs.add(AnswerMapper.toAnswerOutputDTO(answer));
        }
        return new QuestionOutputDTO(question.getQuestionNumber(), question.getQuestionContent(), listOfAnswerOutputDTOs);
    }

    public static QuestionWithCorrectAnswersOutputDTO toQuestionWithCorrectAnswersOutputDTO(Question question) {
        List<AnswerCorrectOutputDTO> listOfAnswerOutputDTOs = new ArrayList<>();
        for (Answer answer : question.getListOfAnswers()) {
            listOfAnswerOutputDTOs.add(AnswerMapper.toAnswerCorrectOutputDTO(answer));
        }
        return new QuestionWithCorrectAnswersOutputDTO(question.getQuestionNumber(), question.getQuestionContent(), listOfAnswerOutputDTOs);
    }
}
