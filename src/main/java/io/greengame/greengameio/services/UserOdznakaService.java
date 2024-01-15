package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserOdznaka;
import io.greengame.greengameio.repository.OdznakaRepository;
import io.greengame.greengameio.repository.UserOdznakaRepository;
import io.greengame.greengameio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserOdznakaService {
    private final UserOdznakaRepository userOdznakaRepository;
    private final UserRepository userRepository;
    private final OdznakaRepository odznakaRepository;

    public List<UserOdznaka> getUsersOdznaki() {
        return userOdznakaRepository.findAll();
    }

    public Odznaka utworzOdznake(String nazwa, String opis, String src) {
        odznakaRepository.save(new Odznaka(nazwa, opis, src));
        return odznakaRepository.findByNazwa(nazwa).orElseThrow(() -> new RuntimeException("Odznaka not found."));
    }

    public List<Optional<User>> getAllUsersWhoHaveCertainAward(Long odzakaId) {
        List<UserOdznaka> list = userOdznakaRepository.findByOdznakaId(odzakaId);
        List<Optional<User>> listaUzytkownikowKtorzyMajaDanaOdznaka = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            listaUzytkownikowKtorzyMajaDanaOdznaka.add(userRepository.findById(list.get(i).getUserId()));
        }
        return listaUzytkownikowKtorzyMajaDanaOdznaka;
    }

    public List<Optional<Odznaka>> getWszystkieOdznakiUsera(Long userId) {
        List<UserOdznaka> list = userOdznakaRepository.findByUserId(userId);
        List<Optional<Odznaka>> listaWszystkichOdznakUsera = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            listaWszystkichOdznakUsera.add(odznakaRepository.findById(list.get(i).getOdznakaId()));
        }
        return listaWszystkichOdznakUsera;
    }

    public User przypnijOdznake(Long idUsera, Long idOdznaki) {
        User user1 = userRepository.findById(idUsera).orElseThrow(() -> new RuntimeException("User not found."));
        user1.setOdznaka(idOdznaki);
        userRepository.save(user1);
        return userRepository.findById(idUsera).orElseThrow(() -> new RuntimeException("User not found."));
    }

    public Optional<User> zrwocUserow(Long id) {
        return userRepository.findById(id);
    }

    public void dodajOdznakeDlaUzytkownika(Long idUsera, Long idOdznaka) {
        userOdznakaRepository.save(new UserOdznaka(idUsera, idOdznaka));
    }
}
