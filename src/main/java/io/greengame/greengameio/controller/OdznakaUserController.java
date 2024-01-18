package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.entity.UserOdznaka;
import io.greengame.greengameio.services.UserOdznakaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/odznakaManager")
@RequiredArgsConstructor
public class OdznakaUserController {
    private final UserOdznakaService odznakaService;

    @GetMapping
    List<UserOdznaka> getAllObjects() {
        return odznakaService.getUsersOdznaki();
    }

    @GetMapping("/user/{id}")
    List<Optional<Odznaka>> getAllUsersAwards(@PathVariable Long id) {
        return odznakaService.getWszystkieOdznakiUsera(id);
    }

    @GetMapping("/odznaka/{id}")
    List<Optional<User>> getAllUsersWhoHaveAward(@PathVariable Long id) {
        return odznakaService.getAllUsersWhoHaveCertainAward(id);
    }

    @GetMapping("/przyznajOdznake")
    void przyznajOdznake(@RequestParam Long idUsera, @RequestParam Long idOdznaka) {
        odznakaService.dodajOdznakeDlaUzytkownika(idUsera, idOdznaka);
    }

    @GetMapping("/przypnij")
    User przypnijOdznake(@RequestParam Long idUsera, @RequestParam Long idOdz) {
        return odznakaService.przypnijOdznake(idUsera, idOdz);
    }

    @GetMapping("/dodajOdznake")
    Odznaka dodaja(@RequestParam String nazwa, String opis, String src) {
        return odznakaService.utworzOdznake(nazwa, opis, src);
    }

    @GetMapping("/gracze/{id}")
    Optional<User> zwrocUserow(@PathVariable Long id) {
        return odznakaService.zrwocUserow(id);
    }



}
