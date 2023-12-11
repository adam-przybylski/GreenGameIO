package io.greengame.greengameio.friendmodule.managers;

import io.greengame.greengameio.friendmodule.exceptions.ErrorMessages;
import io.greengame.greengameio.friendmodule.exceptions.IllegalOperationException;
import io.greengame.greengameio.friendmodule.exceptions.NotFoundException;
import io.greengame.greengameio.friendmodule.model.Chat;
import io.greengame.greengameio.friendmodule.model.Friend;
import io.greengame.greengameio.friendmodule.model.Group;
import io.greengame.greengameio.friendmodule.repositories.AbstractChatHolderRepository;
import io.greengame.greengameio.friendmodule.repositories.ChatRepository;
import io.greengame.greengameio.friendmodule.repositories.UserFMRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Transactional(isolation = Isolation.REPEATABLE_READ)
public class FriendManager {
    private final AbstractChatHolderRepository abstractChatHolderRepository;
    private final UserFMRepository userFMRepository;
    private final ChatRepository chatRepository;

    public void sendFriendRequest(Long senderId, Long receiverId)  {
        var sender = userFMRepository.findById(senderId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        var receiver = userFMRepository.findById(receiverId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        if(sender.getFriends()
                .stream()
                .anyMatch(id -> receiver
                        .getFriends()
                        .contains(id))
                || sender.getFriendRequests().containsKey(receiver.getId())
                || receiver.getFriendRequests().containsKey(sender.getId())) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        receiver.getFriendRequests().put(sender.getId(),sender.getUsername());
        userFMRepository.save(receiver);
    }

    public void acceptFriendRequest(Long senderId, Long receiverId) {
        var sender = userFMRepository.findById(senderId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        var receiver = userFMRepository.findById(receiverId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        if(!receiver.getFriendRequests().containsKey(senderId)) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        Chat chat = new Chat();
        chat = chatRepository.save(chat);
        Friend friend = new Friend();
        friend.getMembers().put(senderId,sender.getUsername());
        friend.getMembers().put(receiverId,receiver.getUsername());
        friend.setChatId(chat.getId());
        friend = abstractChatHolderRepository.save(friend);
        receiver.getFriendRequests().remove(senderId);
        receiver.getFriends().add(friend.getId());
        sender.getFriends().add(friend.getId());
        userFMRepository.save(receiver);
        userFMRepository.save(sender);
    }
    public void removeFriend(Long senderId, Long receiverId) {
        var sender = userFMRepository.findById(senderId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        var receiver = userFMRepository.findById(receiverId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        if(!receiver.getFriends().contains(senderId) || !sender.getFriends().contains(receiverId)) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        var friend = abstractChatHolderRepository.findById(receiver
                        .getFriends()
                        .stream()
                        .filter(id -> id.equals(senderId))
                        .findFirst()
                        .get())
                .orElseThrow(() -> new NotFoundException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION));
        receiver.getFriends().remove(friend.getId());
        sender.getFriends().remove(friend.getId());
        abstractChatHolderRepository.deleteById(friend.getId());
        userFMRepository.save(receiver);
        userFMRepository.save(sender);
    }
    public List<Friend> findFriends(Long id) {
        var user = userFMRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        return abstractChatHolderRepository
                .findAllById(user.getFriends())
                .stream()
                .map(friend -> (Friend) friend)
                .toList();
    }
    public List<Group> findGroups(Long id) {
        var user = userFMRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        return abstractChatHolderRepository
                .findAllById(user.getGroups())
                .stream()
                .map(group -> (Group) group)
                .toList();
    }
    public Map<Long, String> findFriendRequests(Long id) {
        var user = userFMRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        return user.getFriendRequests();
    }
}
