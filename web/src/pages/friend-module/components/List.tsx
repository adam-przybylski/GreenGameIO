import { FC, useEffect, useState } from "react";
import Friend from "./Friend";
import Group from "./Group";
import AddFriendModal from "./AddFriendModal";
import PendingRequestsModal from "./PendingRequestsModal";
import { useParams } from "react-router-dom";
import api from "../api/api";
import CreateGroupModal from "./CreateGroupModal";
import AddGroupMembersModal from "./AddGroupMembersModal";
import UserModal from "./UserModal";
import GroupModal from "./GroupModal";
import EditGroupModal from "./EditGroupModal";
import { useUserContext } from "../../../context/userContext";

const List: FC = () => {
    const [areFriendsDisplayed, setAreFriendsDisplayed] = useState(true);
    const [isAddFriendModalDisplayed, setIsAddFriendModalDisplayed] = useState(false);
    const [isPendingRequestsModalDisplayed, setIsPendingRequestsModalDisplayed] = useState(false);
    const [isCreateGroupModalDisplayed, setIsCreateGroupModalDisplayed] = useState(false);
    const [isAddGroupMemberModalDisplayed, setIsAddGroupMemberModalDisplayed] = useState(false);
    const [isViewedGroupModalDisplayed ,setIsViewedGroupModalDisplayed] = useState(false);
    const [isViewedUserModalDisplayed ,setIsViewedUserModalDisplayed] = useState(false);
    const [isEditGroupModalDisplayed, setIsEditGroupModalDisplayed] = useState(false);
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [groups, setGroups] = useState([]);
    const [filter, setFilter] = useState("");
    const [clickedGroup, setClickedGroup] = useState();
    const [viewedGroup, setViewedGroup] = useState();
    const [viewedUser, setViewedUser] = useState();
    const [editGroup, setEditGroup] = useState();
    const id = useUserContext().account?.id;

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
    const displayEditGroupModal = () => setIsEditGroupModalDisplayed(true);
    const closeEditGroupModal = () => setIsEditGroupModalDisplayed(false);

    useEffect(() => {
        api.getFriendsOfUser(setFilteredFriends, id);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (id) {
                api.getFriendsOfUser(setFriends, id);
                api.getPendingRequests(id, setRequests);
                api.getAllUsers(id, setUsers);
                api.getUsersGroups(id, setGroups);

            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const filterFriends = (text) => {
        return [...friends].filter(element => element.name.includes(text));
    }

    useEffect(() => {
        setFilteredFriends(filterFriends(filter));
    }, [filter, friends]);

    return (
        <div id="list">
            <h1 id="heading">Znajomi</h1>
            {areFriendsDisplayed ? <input className="text" value={filter} type="text" name="" id="user-filter" onChange={(e) => {setFilter(e.target.value)}} placeholder="Filter friends"/> : <></>}
            <div id="functional-buttons">
                {areFriendsDisplayed && <button className="button" onClick={displayAddFriendModal}>Dodaj znajomego</button>}
                {!areFriendsDisplayed && <button className="button" onClick={displayCreateGroupModal}>Utwórz grupę</button>}
                <button className="button" onClick={displayPendingRequestModal}>Zaproszenia</button>
            </div>
            <div id="content">
                <div id="switch-buttons">
                    <button className={`button ${areFriendsDisplayed ? "pressed" : ""}`} id="friends-button" onClick={displayFriends}>Znajomi</button>
                    <button className={`button ${areFriendsDisplayed ? "" : "pressed"}`} id="groups-button" onClick={displayGroups}>Grupy</button>
                </div>
                {areFriendsDisplayed && 
                <div id="friends">
                    {filteredFriends.map((x, _i) => {
                        return <Friend friend={x} userID={id} viewModal={displayUserModal} setViewedUser={setViewedUser}></Friend>
                    })}
                </div>}
                {!areFriendsDisplayed && 
                <div id="groups">
                    {groups.map((x, _i) => {
                        return <Group group={x} id={id} displayAddModal={displayAddGroupMemberModal} setClickedGroup={setClickedGroup} displayModal={displayGroupModal} setViewedGroup={setViewedGroup} displayEditGroupModal={displayEditGroupModal} setEditGroup={setEditGroup}></Group>
                    })}
                </div>}
            </div>
            {isAddFriendModalDisplayed ? <AddFriendModal close={closeAddFriendModal} userID={id} users={users}></AddFriendModal> : <></>}
            {isPendingRequestsModalDisplayed ? <PendingRequestsModal close={closePendingRequestModal} userID={id} requests={requests}></PendingRequestsModal> : <></>}
            {isCreateGroupModalDisplayed ? <CreateGroupModal close={closeCreateGroupModal} id={id}></CreateGroupModal> : <></>}
            {isAddGroupMemberModalDisplayed ? <AddGroupMembersModal close={closeAddGroupMemberModal} id={id} friends={friends} group={groups.filter(element => element.id == clickedGroup)[0]}></AddGroupMembersModal> : <></>}
            {isViewedUserModalDisplayed ? <UserModal user={users.filter(element => element.id == viewedUser)[0]} close={closeUserModal} users={users}></UserModal> : <></>}
            {isViewedGroupModalDisplayed ? <GroupModal close={closeDisplayGroupModal} group={groups.filter(element => element.id == viewedGroup)[0]}></GroupModal> : <></>}
            {isEditGroupModalDisplayed ? <EditGroupModal close={closeEditGroupModal} group={groups.filter(element => element.id == editGroup)[0]} id={id}></EditGroupModal> : <></>}
        </div>
    );
};

export default List;