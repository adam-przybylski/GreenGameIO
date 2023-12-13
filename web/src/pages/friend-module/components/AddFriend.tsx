import api from "../api/api";
import "../styles/AddFriend.css";

const AddFriend = ({ friend, userID }) => {
    const addFriend = () => {
        api.addFriend(userID, friend);
    }
    return (
        <div className="add-friend" id={friend.id}>
            <div id="name">
                <h2>{friend.username}</h2>
            </div>
            <div id="buttons">
                <button className="button" onClick={addFriend}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                    </svg>
                </button>
            </div>
        </div>
    )
};

export default AddFriend;