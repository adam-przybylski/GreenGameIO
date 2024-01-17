import { FC, useState } from "react";
import api from "../api/api";
import ChatModal from "./ChatModal";

const Friend: FC = ({ friend, userID, viewModal, setViewedUser}) => {
    const [displayChat, setDisplayChat] = useState(false);
    const setViewedUserAndDisplayModal = () => {
        setViewedUser(friend.id);
        viewModal();
    };
    const removeFriend = () => {
        api.removeFriend(userID, friend);
    };
    return (
        <div className="friend" id={friend.id} onClick={setViewedUserAndDisplayModal}>
            <div id="name">
                <h2>{friend.name}</h2>
            </div>
            <div id="buttons">
                <button className="button" onClick={e => {
                    e.stopPropagation();
                    removeFriend();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                </button>
                <button className="button" onClick={e => {
                    e.stopPropagation();
                    setDisplayChat(true);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    </svg>
                </button>
            </div>
            { displayChat && <ChatModal userID={userID} friend={friend} close={() => setDisplayChat(false)}></ChatModal> }
        </div>
    )
};

export default Friend;