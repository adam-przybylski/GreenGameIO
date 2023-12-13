import { FC, useState } from "react";
import Friend from "./Friend";
import Group from "./Group";
import "../styles/List.css";
import AddFriendModal from "./AddFriendModal";
import PendingRequestsModal from "./PendingRequestsModal";

const List: FC = ({ friends, userID, update }) => {
    const [areFriendsDisplayed, setAreFriendsDisplayed] = useState(true);
    const [isAddFriendModalDisplayed, setIsAddFriendModalDisplayed] = useState(false);
    const [isPendingRequestsModalDisplayed, setIsPendingRequestsModalDisplayed] = useState(false);

    const displayAddFriendModal = () => setIsAddFriendModalDisplayed(true)
    const closeAddFriendModal = () =>setIsAddFriendModalDisplayed(false);
    const displayFriends = () => setAreFriendsDisplayed(true);
    const displayGroups = () => setAreFriendsDisplayed(false);
    const displayPendingRequestModal = () => setIsPendingRequestsModalDisplayed(true);
    const closePendingRequestModal = () => setIsPendingRequestsModalDisplayed(false);

    return (
        <div id="list">
            <h1 id="heading">Friends</h1>
            <div id="functional-buttons">
                <button className="button" onClick={displayAddFriendModal}>Add friend</button>
                <button className="button">Create group</button>
                <button className="button" onClick={displayPendingRequestModal}>Friend requests</button>
            </div>
            <div id="content">
                <div id="switch-buttons">
                    <button className="button" id="friends-button" onClick={displayFriends}>Friends</button>
                    <button className="button" id="groups-button" onClick={displayGroups}>Groups</button>
                </div>
                {areFriendsDisplayed && 
                <div id="friends">
                    {friends.map((x, _i) => {
                        return <Friend friend={x} userID={userID} update={update}></Friend>
                    })}
                </div>}
                {!areFriendsDisplayed && 
                    <div id="groups">
                        {friends.filter(friend => friend.id == userID)[0].groups.map((x, i) => {
                            return <Group group={x}></Group>
                        })}
                    </div>}
            </div>
            {isAddFriendModalDisplayed ? <AddFriendModal close={closeAddFriendModal} userID={userID}></AddFriendModal> : <></>}
            {isPendingRequestsModalDisplayed ? <PendingRequestsModal close={closePendingRequestModal} userID={userID} update={update}></PendingRequestsModal> : <></>}
        </div>
    );
};

export default List;