package io.greengame.greengameio.dtos.quizzes.mappers;

import io.greengame.greengameio.dtos.quizzes.input_dtos.QuestionInputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuestionWithCorrectAnswersOutputDTO;
import io.greengame.greengameio.dtos.quizzes.input_dtos.QuizInputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuizWithCorrectAnswersDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuestionOutputDTO;
import io.greengame.greengameio.dtos.quizzes.output_dtos.QuizOutputDTO;
import io.greengame.greengameio.entity.Question;
import io.greengame.greengameio.entity.Quiz;

import java.util.ArrayList;
import java.util.List;

public class QuizMapper {

    public static Quiz toQuiz(QuizInputDTO quizInputDTO) {
        List<Question> listOfQuestions = new ArrayList<>();
        List<QuestionInputDTO> listOfQuestionInputDTOs = quizInputDTO.getListOfQuestions();
        for (int i = 0; i < listOfQuestionInputDTOs.size(); i++) {
            listOfQuestions.add(QuestionMapper.toQuestion(listOfQuestionInputDTOs.get(i), i + 1));
        }
        return new Quiz(quizInputDTO.getQuizTitle(), quizInputDTO.getQuizCreatorName(), quizInputDTO.getQuizOpenDate(), listOfQuestions);
    }

    public static QuizOutputDTO toQuizOutputDTO(Quiz quiz) {
        List<QuestionOutputDTO> listOfQuestionOutputDTOs = new ArrayList<>();
        for (Question question : quiz.getListOfQuestions()) {
            listOfQuestionOutputDTOs.add(QuestionMapper.toQuestionOutputDTO(question));
        }
        return new QuizOutputDTO(quiz.getQuizID(), quiz.getQuizTitle(), quiz.getQuizCreatorName(), quiz.getQuizOpenDate(), quiz.getQuizLength(), listOfQuestionOutputDTOs);
    }

    public static QuizWithCorrectAnswersDTO toQuizWithCorrectAnswersDTO(Quiz quiz) {
        List<QuestionWithCorrectAnswersOutputDTO> listOfQuestionOutputDTOs = new ArrayList<>();
        for (Question question : quiz.getListOfQuestions()) {
            listOfQuestionOutputDTOs.add(QuestionMapper.toQuestionWithCorrectAnswersOutputDTO(question));
        }
        return new QuizWithCorrectAnswersDTO(quiz.getQuizID(), quiz.getQuizTitle(), quiz.getQuizCreatorName(), quiz.getQuizOpenDate(), quiz.getQuizLength(), listOfQuestionOutputDTOs);
    }
}
