package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.services.OdznakaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/odznaki")
@RequiredArgsConstructor
public class OdznakaContrloller {

    private final OdznakaService odznakaService;

    @CrossOrigin(origins = "http://localhost:8081")
    @GetMapping
    List<Odznaka> getOdznaki() {
        return odznakaService.getOdznaki();
    } //

    @GetMapping("/nazwaOdznaki/{name}")
    Odznaka getOdznakaByNazme(@PathVariable String name) { return odznakaService.getOdznakaByName(name); }

    @GetMapping("/idOdznaki/{id}")
    Odznaka getOdznakaById(@PathVariable Long id) { return odznakaService.getOdznakaById(id); }

    @GetMapping("/tworzenieOdznaki")
    Odznaka createOdznaka(@RequestParam String nazwa, String opis, String src) {
        return odznakaService.createOdznaka(nazwa, opis, src);
    }
}
