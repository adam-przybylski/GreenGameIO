import { FC, useState } from "react";
import Friend from "./Friend";
import Group from "./Group";
import "../styles/List.css";

const List: FC = ({ friends, userID }) => {
    const [areFriendsDisplayed, setAreFriendsDisplayed] = useState(true);
    const displayFriends = () => setAreFriendsDisplayed(true);
    const displayGroups = () => setAreFriendsDisplayed(false);
    return (
        <div id="list">
            <h1 id="heading">Friends</h1>
            <div id="functional-buttons">
                <button className="button">Add friend</button>
                <button className="button">Create group</button>
            </div>
            <div id="content">
                <div id="switch-buttons">
                    <button className="button" id="friends-button" onClick={displayFriends}>Friends</button>
                    <button className="button" id="groups-button" onClick={displayGroups}>Groups</button>
                </div>
                {areFriendsDisplayed && 
                <div id="friends">
                    {friends.map((x, i) => {
                        return <Friend friend={x} userID={userID}></Friend>
                    })}
                </div>}
                {!areFriendsDisplayed && 
                    <div id="groups">
                        {friends.filter(friend => friend.id == userID)[0].groups.map((x, i) => {
                            return <Group group={x}></Group>
                        })}
                    </div>}
            </div>
        </div>
    );
};

export default List;