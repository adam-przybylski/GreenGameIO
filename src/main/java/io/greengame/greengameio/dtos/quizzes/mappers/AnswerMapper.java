package io.greengame.greengameio.dtos.quizzes.mappers;

import io.greengame.greengameio.dtos.quizzes.output_dtos.AnswerCorrectOutputDTO;
import io.greengame.greengameio.dtos.quizzes.input_dtos.AnswerInputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.AnswerOutputDTO;
import io.greengame.greengameio.entity.Answer;

public class AnswerMapper {

    public static Answer toAnswer(AnswerInputDTO answerInputDTO, int answerNumber) {
        return new Answer(answerNumber, answerInputDTO.getAnswerContent(), answerInputDTO.isCorrect());
    }

    public static AnswerOutputDTO toAnswerOutputDTO(Answer answer) {
        return new AnswerOutputDTO(answer.getAnswerNumber(), answer.getAnswerContent());
    }

    public static AnswerCorrectOutputDTO toAnswerCorrectOutputDTO(Answer answer) {
        return new AnswerCorrectOutputDTO(answer.getAnswerNumber(), answer.getAnswerContent(), answer.isCorrect());
    }
}
