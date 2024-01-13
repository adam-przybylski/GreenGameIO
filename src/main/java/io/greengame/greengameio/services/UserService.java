package io.greengame.greengameio.services;


import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.friendmodule.exceptions.ErrorMessages;
import io.greengame.greengameio.friendmodule.exceptions.NotFoundException;
import io.greengame.greengameio.friendmodule.model.Group;
import io.greengame.greengameio.friendmodule.model.UserFM;
import io.greengame.greengameio.friendmodule.repositories.AbstractChatHolderRepository;
import io.greengame.greengameio.friendmodule.repositories.ChatRepository;
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
    private final ChatRepository chatRepository;
    private final AbstractChatHolderRepository abstractChatHolderRepository;

    public User createUser(User user) {
        User user1 = userRepository.save(user);
        createUserFM(user1.getId(), user1.getUsername());
        return user1;
    }

    public long deleteUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
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

    public User updateUsername(Long id, String username) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found."));
        user.setUsername(username);
        return userRepository.save(user);
    }

    public User updateUser(String username, User user) {
        User user1 = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found."));
        user1.setUsername(user.getUsername());
        user1.setPassword(user.getPassword());
        user1.setEmail(user.getEmail());
        user1.setType(user.getType());
        user1.setOdznaka(user.getOdznaka());
        return userRepository.save(user1);
    }

    private void createUserFM(Long id, String username) {
        UserFM userFM = new UserFM();
        userFM.setId(id);
        userFM.setUsername(username);
        userFMRepository.save(userFM);
    }

    private void deleteUserFM(Long id) {
        UserFM userFM = userFMRepository.findById(id).orElseThrow();
        List<String> friendList = userFM.getFriends();
        List<String> groupsList = userFM.getGroups();
        List<UserFM> userFMList = userFMRepository.findAll();
        userFMList.forEach(userFM1 -> {
            userFM1.getFriends().removeAll(friendList);
        });
        friendList.forEach(friend ->
                chatRepository.deleteById(abstractChatHolderRepository.findById(friend)
                        .orElseThrow(
                                () -> new NotFoundException(ErrorMessages
                                        .BadRequestErrorMessages
                                        .ILLEGAL_OPERATION))
                        .getChatId())
        );
        abstractChatHolderRepository.findAllById(groupsList)
                .stream()
                .map(o -> (Group) o)
                .forEach(group -> {
                    group.getMembers().remove(id);
                    if (group.getMembers().isEmpty()) {
                        chatRepository.deleteById(group.getChatId());
                        abstractChatHolderRepository.deleteById(group.getId());
                    } else {
                        group.setOwnerId(group
                                .getMembers()
                                .keySet()
                                .stream()
                                .findFirst()
                                .orElseThrow(() ->
                                        new NotFoundException(ErrorMessages
                                                .BadRequestErrorMessages
                                                .ILLEGAL_OPERATION)));
                        abstractChatHolderRepository.save(group);
                    }
                });
        abstractChatHolderRepository.deleteAllById(friendList);
        userFMRepository.deleteById(id);
    }
}
