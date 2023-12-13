import { FC, useEffect, useState } from "react";
import api from "./api/api";
import List from "./components/List";
import { useParams } from "react-router-dom";

const FriendPage: FC = () => {
    const { id } = useParams();
    const friends = [
        {
            "id": 1,
            "username": "admin",
            "friends": [],
            "groups": ["gra", "gas"],
            "friendRequests": {}
        },
        {
            "id": 2,
            "username": "user",
            "friends": [],
            "groups": [],
            "friendRequests": {}
        },
        {
            "id": 3,
            "username": "user11",
            "friends": [],
            "groups": [],
            "friendRequests": {}
        }
    ];
    const [friendsList, setFriendsList] = useState(friends);
    return (
        <div>
            <List friends={friendsList} userID={id}></List>
        </div>
    );
};

export default FriendPage;