package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Name is mandatory")
    private String name;

    @Column(name = "description", nullable = false)
    @Lob
    @NotBlank(message = "Description is mandatory")
    private String description;

    @Column(name = "expValue", nullable = false)
    @Positive(message = "Experience value cannot be negative or zero")
    @NotNull(message = "Experience value is mandatory")
    private int expValue;

    @Column(name = "active", nullable = false)
    private boolean active;
}
