package io.greengame.greengameio.services;

import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.repository.OdznakaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OdznakaService {

    private final OdznakaRepository odznakaRepository;

    public Odznaka createOdznaka(String nazwa, String opis, String src) { return odznakaRepository.save(new Odznaka(nazwa, opis, src)); }

    public List<Odznaka> getOdznaki() { return odznakaRepository.findAll(); }

    public Odznaka getOdznakaById(Long id) { return odznakaRepository.findById(id).orElseThrow(() -> new RuntimeException("Nie odnalaziono odznaki.")); }

    public Odznaka getOdznakaByName(String name) { return odznakaRepository.findByNazwa(name).orElseThrow(() -> new RuntimeException("Nie odnaleziono odznaki.")); }
}
