package io.greengame.greengameio.friendmodule.managers;

import io.greengame.greengameio.friendmodule.dto.GroupUpdateDTO;
import io.greengame.greengameio.friendmodule.exceptions.ErrorMessages;
import io.greengame.greengameio.friendmodule.exceptions.IllegalOperationException;
import io.greengame.greengameio.friendmodule.exceptions.NotFoundException;
import io.greengame.greengameio.friendmodule.model.*;
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

    public List<UserFM> findAllUserFMs() {
        return userFMRepository.findAll();
    }

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
        var friend = abstractChatHolderRepository.findById(receiver
                        .getFriends()
                        .stream()
                        .filter(id -> sender
                                .getFriends()
                                .contains(id))
                        .findFirst()
                        .get())
                .orElseThrow(() -> new NotFoundException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION));
        receiver.getFriends().remove(friend.getId());
        sender.getFriends().remove(friend.getId());
        chatRepository.deleteById(friend.getChatId());
        abstractChatHolderRepository.deleteById(friend.getId());
        userFMRepository.save(receiver);
        userFMRepository.save(sender);
    }
    public void removeFriendRequest(Long senderId, Long receiverId) {
        var sender = userFMRepository.findById(senderId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        var receiver = userFMRepository.findById(receiverId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        if(!receiver.getFriendRequests().containsKey(senderId)) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        receiver.getFriendRequests().remove(senderId);
        userFMRepository.save(receiver);
    }
    public List<Friend> findAllFriends(Long id) {
        var user = userFMRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        return abstractChatHolderRepository
                .findAllById(user.getFriends())
                .stream()
                .map(friend -> (Friend) friend)
                .toList();
    }
    public List<Group> findAllGroups(Long id) {
        var user = userFMRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        return abstractChatHolderRepository
                .findAllById(user.getGroups())
                .stream()
                .map(group -> (Group) group)
                .toList();
    }
    public Map<Long, String> findAllFriendRequests(Long id) {
        var user = userFMRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        return user.getFriendRequests();
    }
    public Group createGroup(Long userId, GroupUpdateDTO groupUpdateDTO) {
        var user = userFMRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        Chat chat = new Chat();
        chat = chatRepository.save(chat);
        Group group = new Group();
        group.setName(groupUpdateDTO.name());
        group.getMembers().put(user.getId(),user.getUsername());
        group.setDescription(groupUpdateDTO.description());
        group.setOwnerId(user.getId());
        group.setChatId(chat.getId());
        group = abstractChatHolderRepository.save(group);
        user.getGroups().add(group.getId());
        userFMRepository.save(user);
        return group;
    }
    public Group updateGroup(Long ownerId, String id, GroupUpdateDTO groupUpdateDTO) {
        var group = (Group) abstractChatHolderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.GROUP_NOT_FOUND));
        if(!group.getOwnerId().equals(ownerId)) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        if(groupUpdateDTO.name() != null) {
            group.setName(groupUpdateDTO.name());
        }
        if(groupUpdateDTO.description() != null) {
            group.setDescription(groupUpdateDTO.description());
        }
        if(groupUpdateDTO.ownerId() != 0) {
            group.setOwnerId(groupUpdateDTO.ownerId());
        }
        return abstractChatHolderRepository.save(group);
    }
    public void deleteGroup(Long ownerId, String id) {
        var group = (Group) abstractChatHolderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.GROUP_NOT_FOUND));
        if(!group.getOwnerId().equals(ownerId)) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        group.getMembers().forEach((memberId,username) -> {
            var member = userFMRepository.findById(memberId)
                    .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
            member.getGroups().remove(group.getId());
            userFMRepository.save(member);
        });
        chatRepository.deleteById(group.getChatId());
        abstractChatHolderRepository.deleteById(id);
    }
    public Group addGroupMember(Long ownerId, String id, Long memberId) {
        var group = (Group) abstractChatHolderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.GROUP_NOT_FOUND));
        var member = userFMRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        if(!group.getOwnerId().equals(ownerId)) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        group.getMembers().put(member.getId(),member.getUsername());
        member.getGroups().add(group.getId());
        abstractChatHolderRepository.save(group);
        userFMRepository.save(member);
        return group;
    }
    public Group removeGroupMember(Long ownerId, String id, Long memberId) {
        var group = (Group) abstractChatHolderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.GROUP_NOT_FOUND));
        var member = userFMRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.USER_NOT_FOUND));
        if(!group.getOwnerId().equals(ownerId)) {
            throw new IllegalOperationException(ErrorMessages.BadRequestErrorMessages.ILLEGAL_OPERATION);
        }
        if(!group.getMembers().containsKey(memberId)) {
            group.getMembers().remove(member.getId());
            group.setOwnerId(group.getMembers().keySet().stream().findFirst().get());
        } else {
            group.getMembers().remove(member.getId());
        }
        member.getGroups().remove(group.getId());
        abstractChatHolderRepository.save(group);
        userFMRepository.save(member);
        return group;
    }
    public Chat findChatById(String id) {
        return chatRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.CHAT_NOT_FOUND));
    }
    public Message sendMessage(String chatId, Message message) {
        var chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new NotFoundException(ErrorMessages.NotFoundErrorMessages.CHAT_NOT_FOUND));
        chat.getMessages().add(message);
        chat = chatRepository.save(chat);
        return chat.getMessages().get(chat.getMessages().size() - 1);
    }
    public List<UserFM> findByUsernameContainsIgnoreCase(Long userId,String username) {
        return userFMRepository.findByUsernameContainsIgnoreCase(username)
                .stream()
                .filter(userFM -> !userFM.getId().equals(userId))
                .toList();
    }
}
