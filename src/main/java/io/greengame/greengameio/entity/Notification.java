package io.greengame.greengameio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    @NotBlank(message = "Title is mandatory")
    private String title;

    @Column(name = "content", nullable = false)
    @NotBlank(message = "Content is mandatory")
    private String content;

    public Notification(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
