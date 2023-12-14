import { FC, useEffect, useState } from "react";
import Friend from "./Friend";
import Group from "./Group";
import "../styles/List.css";
import AddFriendModal from "./AddFriendModal";
import PendingRequestsModal from "./PendingRequestsModal";
import { useParams } from "react-router-dom";
import api from "../api/api";
import CreateGroupModal from "./CreateGroupModal";
import AddGroupMembersModal from "./AddGroupMembersModal";
import UserModal from "./UserModal";
import GroupModal from "./GroupModal";

const List: FC = () => {
    const [areFriendsDisplayed, setAreFriendsDisplayed] = useState(true);
    const [isAddFriendModalDisplayed, setIsAddFriendModalDisplayed] = useState(false);
    const [isPendingRequestsModalDisplayed, setIsPendingRequestsModalDisplayed] = useState(false);
    const [isCreateGroupModalDisplayed, setIsCreateGroupModalDisplayed] = useState(false);
    const [isAddGroupMemberModalDisplayed, setIsAddGroupMemberModalDisplayed] = useState(false);
    const [isViewedGroupModalDisplayed ,setIsViewedGroupModalDisplayed] = useState(false);
    const [isViewedUserModalDisplayed ,setIsViewedUserModalDisplayed] = useState(false);
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [groups, setGroups] = useState([]);
    const [clickedGroup, setClickedGroup] = useState();
    const [viewedGroup, setViewedGroup] = useState();
    const [viewedUser, setViewedUser] = useState();
    const { id } = useParams();

    useEffect(() => {
        api.getFriendsOfUser(setFriends, id);
    }, []);
    useEffect(() => {
        api.getPendingRequests(id, setRequests);
    }, []);
    useEffect(() => {
        api.getAllUsers(id, setUsers);
    }, []);
    useEffect(() => {
        api.getUsersGroups(id, setGroups)
    }, []);

    const displayAddFriendModal = () => setIsAddFriendModalDisplayed(true)
    const closeAddFriendModal = () => setIsAddFriendModalDisplayed(false);
    const displayFriends = () => setAreFriendsDisplayed(true);
    const displayGroups = () => setAreFriendsDisplayed(false);
    const displayPendingRequestModal = () => setIsPendingRequestsModalDisplayed(true);
    const closePendingRequestModal = () => setIsPendingRequestsModalDisplayed(false);
    const displayCreateGroupModal = () => setIsCreateGroupModalDisplayed(true);
    const closeCreateGroupModal = () => setIsCreateGroupModalDisplayed(false);
    const displayAddGroupMemberModal = () => setIsAddGroupMemberModalDisplayed(true);
    const closeAddGroupMemberModal = () => setIsAddGroupMemberModalDisplayed(false);
    const displayUserModal = () => setIsViewedUserModalDisplayed(true);
    const closeUserModal = () => setIsViewedUserModalDisplayed(false);
    const displayGroupModal = () => setIsViewedGroupModalDisplayed(true);
    const closeDisplayGroupModal = () => setIsViewedGroupModalDisplayed(false);

    useEffect(() => {
        const interval = setInterval(() => {
            api.getFriendsOfUser(setFriends, id);
            api.getPendingRequests(id, setRequests);
            api.getAllUsers(id, setUsers);
            api.getUsersGroups(id, setGroups);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="list">
            <h1 id="heading">Friends</h1>
            <div id="functional-buttons">
                {areFriendsDisplayed && <button className="button" onClick={displayAddFriendModal}>Add friend</button>}
                {!areFriendsDisplayed && <button className="button" onClick={displayCreateGroupModal}>Create group</button>}
                <button className="button" onClick={displayPendingRequestModal}>Friend requests</button>
            </div>
            <div id="content">
                <div id="switch-buttons">
                    <button className={`button ${areFriendsDisplayed ? "pressed" : ""}`} id="friends-button" onClick={displayFriends}>Friends</button>
                    <button className={`button ${areFriendsDisplayed ? "" : "pressed"}`} id="groups-button" onClick={displayGroups}>Groups</button>
                </div>
                {areFriendsDisplayed && 
                <div id="friends">
                    {friends.map((x, _i) => {
                        return <Friend friend={x} userID={id} viewModal={displayUserModal} setViewedUser={setViewedUser}></Friend>
                    })}
                </div>}
                {!areFriendsDisplayed && 
                <div id="groups">
                    {groups.map((x, _i) => {
                        return <Group group={x} id={id} displayAddModal={displayAddGroupMemberModal} setClickedGroup={setClickedGroup} displayModal={displayGroupModal} setViewedGroup={setViewedGroup}></Group>
                    })}
                </div>}
            </div>
            {isAddFriendModalDisplayed ? <AddFriendModal close={closeAddFriendModal} userID={id} users={users}></AddFriendModal> : <></>}
            {isPendingRequestsModalDisplayed ? <PendingRequestsModal close={closePendingRequestModal} userID={id} requests={requests}></PendingRequestsModal> : <></>}
            {isCreateGroupModalDisplayed ? <CreateGroupModal close={closeCreateGroupModal} id={id}></CreateGroupModal> : <></>}
            {isAddGroupMemberModalDisplayed ? <AddGroupMembersModal close={closeAddGroupMemberModal} id={id} friends={friends} group={clickedGroup}></AddGroupMembersModal> : <></>}
            {isViewedUserModalDisplayed ? <UserModal user={viewedUser} close={closeUserModal}></UserModal> : <></>}
            {isViewedGroupModalDisplayed ? <GroupModal close={closeDisplayGroupModal} group={viewedGroup}></GroupModal> : <></>}
        </div>
    );
};

export default List;