package io.greengame.greengameio.controller;

import io.greengame.greengameio.entity.Notification;
import io.greengame.greengameio.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/admin/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public List<Notification> get() {
        return notificationService.get();
    }

    @PostMapping
    public Notification create(@RequestBody Notification notification) {
        return notificationService.create(notification);
    }

    @PutMapping
    public Notification update(@RequestBody Notification notification) {
        return notificationService.update(notification);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }
}
