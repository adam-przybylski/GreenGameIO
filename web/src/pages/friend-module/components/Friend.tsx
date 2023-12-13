import { FC } from "react";
import "../styles/Friend.css";

const Friend: FC = ({ friend }) => {
    return (
        <div className="friend" id={friend.id}>
            <h2>{friend.username}</h2>
        </div>
    )
};

export default Friend;