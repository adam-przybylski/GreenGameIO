package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    List<Notification> get() {
        return notificationService.get();
    }

    @PostMapping
    Notification create(@RequestBody Notification notification) {
        return notificationService.create(notification);
    }

    @PutMapping
    Notification update(@RequestBody Notification notification) {
        return notificationService.update(notification);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }
}
