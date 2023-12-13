import { FC, useEffect, useState } from "react";
import api from "./api/api";
import List from "./components/List";
import { useParams } from "react-router-dom";

const FriendPage: FC = () => {
    const [friends, setFriends] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        api.getFriendsOfUser(setFriends, id);
    }, []);
    const update = () => {
        console.log("dipasjdhasiodjao");
        api.getFriendsOfUser(setFriends, id);
    }
    return (
        <div>
            <List friends={friends} userID={id} update={update}></List>
        </div>
    );
};

export default FriendPage;