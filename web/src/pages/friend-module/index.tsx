import { FC, useEffect, useState } from "react";
import api from "./api/api";
import List from "./components/List";
import { useParams } from "react-router-dom";

const FriendPage: FC = () => {
    const [friends, setFriends] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        api.getFriends(setFriends, id);
    }, []);
    return (
        <div>
            <List friends={friends} userID={id}></List>
        </div>
    );
};

export default FriendPage;