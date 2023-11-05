package io.greengame.greengameio.services;


import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void createUser(User user) {
        userRepository.save(user);
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void updateUser(String username, User user) {
        User userToUpdate = userRepository.findByUsername(username);
        if (userToUpdate == null) {
            return;
        }
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setRole(user.getRole());
        userRepository.save(userToUpdate);
    }

    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
    }
}
