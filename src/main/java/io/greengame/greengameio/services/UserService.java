package io.greengame.greengameio.services;


import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.friendmodule.model.UserFM;
import io.greengame.greengameio.friendmodule.repositories.AbstractChatHolderRepository;
import io.greengame.greengameio.friendmodule.repositories.UserFMRepository;
import io.greengame.greengameio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserFMRepository userFMRepository;
    private final AbstractChatHolderRepository abstractChatHolderRepository;

    public User createUser(User user) {
        User user1 = userRepository.save(user);
        System.out.println(user1.toString());
        createUserFM(user1.getId(),user1.getUsername());
        return user1;
    }

    public boolean deleteUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        deleteUserFM(user.getId());
        return userRepository.deleteByUsername(username);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found."));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found."));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found."));
    }

    public User updateUser(String username, User user) {
        User user1 = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found."));
        user1.setUsername(user.getUsername());
        user1.setPassword(user.getPassword());
        user1.setEmail(user.getEmail());
        user1.setType(user.getType());
        return userRepository.save(user1);
    }
    private void createUserFM(Long id,String username) {
        UserFM userFM = new UserFM();
        userFM.setId(id);
        userFMRepository.save(userFM);
    }
    private void deleteUserFM(Long id) {
        UserFM userFM = userFMRepository.findById(id).orElseThrow();
        List<String> friendList = userFM.getFriends();
        List<UserFM> userFMList= userFMRepository.findAll();
        userFMList.forEach(userFM1 -> {
            userFM1.getFriends().removeAll(friendList);
        });
        abstractChatHolderRepository.deleteAllById(friendList);
        userFMRepository.deleteById(id);
    }
}
