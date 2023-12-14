package io.greengame.greengameio.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "odznaki")
public class Odznaka {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nazwa", nullable = false, unique = true)
    @NotBlank(message = "nazwa jest wymagana")
    private String nazwa;

    @Column(name = "opis", nullable = false)
    @NotBlank(message = "opis jest wymagany")
    private String opis;

    @Column(name = "src", nullable = false)
    @NotBlank(message = "obrazek jest wymagany")
    private String source;

    //@ManyToMany(mappedBy = "odznaki", fetch = FetchType.LAZY)
    //private Set<Long> users;

    public Odznaka(String nazwa, String opis, String obrazek) {
        this.nazwa = nazwa;
        this.opis = opis;
        this.source = obrazek;
    }
}
