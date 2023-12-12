package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.HiScore;
import io.greengame.greengameio.entity.Quiz;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.exceptions.hiScore.HiScoreNotFoundException;
import io.greengame.greengameio.repository.HiScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HiScoreService {

    private final HiScoreRepository hiScoreRepository;

    // Create

    public HiScore createHiScore(HiScore hiScore) {
        return hiScoreRepository.save(hiScore);
    }

    // Read

    public HiScore getHighScoreByUserAndQuiz(User user, Quiz quiz) {
        return hiScoreRepository.getHiScoreByUserAndQuiz(user, quiz);
    }

    public List<HiScore> getListOfHighScoresByUser(User user, int numberOfScores) {
        return hiScoreRepository.getHiScoresByUser(user).stream().limit(numberOfScores).toList();
    }

    public List<HiScore> getListOfHighScoresByQuiz(Quiz quiz, int numberOfScores) {
        return hiScoreRepository.getHiScoresByQuiz(quiz).stream().limit(numberOfScores).toList();
    }

    // Update

    public void updateHiScore(HiScore hiScore) {
        hiScoreRepository.save(hiScore);
    }

    // Delete

    public void deleteHighScore(HiScore hiScore) {
        hiScoreRepository.delete(hiScore);
    }

    public void deleteAllHighScoresForUser(User user) {
        hiScoreRepository.deleteAllByUser(user);
    }

    public void deleteAllHighScoresForQuiz(Quiz quiz) {
        hiScoreRepository.deleteAllByQuiz(quiz);
    }
}
