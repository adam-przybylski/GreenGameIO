package io.greengame.greengameio.services;


import io.greengame.greengameio.dtos.UpdateUserDto;
import io.greengame.greengameio.entity.Odznaka;
import io.greengame.greengameio.entity.User;
import io.greengame.greengameio.exceptions.Messages;
import io.greengame.greengameio.exceptions.PasswordIsToWeekException;
import io.greengame.greengameio.exceptions.UnknownUserException;
import io.greengame.greengameio.exceptions.UsersNotFoundException;
import io.greengame.greengameio.friendmodule.exceptions.ErrorMessages;
import io.greengame.greengameio.friendmodule.exceptions.NotFoundException;
import io.greengame.greengameio.friendmodule.model.Group;
import io.greengame.greengameio.friendmodule.model.UserFM;
import io.greengame.greengameio.friendmodule.repositories.AbstractChatHolderRepository;
import io.greengame.greengameio.friendmodule.repositories.ChatRepository;
import io.greengame.greengameio.friendmodule.repositories.UserFMRepository;
import io.greengame.greengameio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.util.List;

import static io.greengame.greengameio.services.PasswordValidator.validatePassword;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserFMRepository userFMRepository;
    private final ChatRepository chatRepository;
    private final AbstractChatHolderRepository abstractChatHolderRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        User user1 = userRepository.save(user);
        createUserFM(user1.getId(), user1.getUsername());
        return user1;
    }

    public boolean deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_USERNAME_DOES_NOT_EXIST));
        user.setEnabled(false);
        userRepository.save(user);
        return user.isEnabled();
    }

    public List<User> getUsers() {
        List<User> users = userRepository.findAll();
        List<User> newUsers = users.stream()
                .filter(User::isEnabled)
                .toList();
        if(newUsers.isEmpty()) {
            throw new UsersNotFoundException(Messages.USERS_NOT_FOUND);
        }
        return newUsers;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_EMAIL_DOES_NOT_EXIST));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_USERNAME_DOES_NOT_EXIST));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_ID_DOES_NOT_EXIST));
    }

    public User updateUsername(Long id, String username) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_ID_DOES_NOT_EXIST));
        user.setUsername(username);
        return userRepository.save(user);
    }

    public User updatePassword(Long id, String password) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_ID_DOES_NOT_EXIST));
        if(!validatePassword(password)) {
            throw new PasswordIsToWeekException(Messages.PASSWORD_IS_TO_WEEK);
        }
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(password)));
        return userRepository.save(user);
    }

    public User updateUser(String username, User user) {
        User user1 = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_ID_DOES_NOT_EXIST));
        user1.setUsername(user.getUsername());
        user1.setPassword(user.getPassword());
        user1.setEmail(user.getEmail());
        user1.setType(user.getType());
        user1.setOdznaka(user.getOdznaka());
        return userRepository.save(user1);
    }

    public User updateUser(Long id, UpdateUserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UnknownUserException(Messages.USER_WITH_GIVEN_ID_DOES_NOT_EXIST));
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setType(userDto.getType());
        return userRepository.save(user);
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
