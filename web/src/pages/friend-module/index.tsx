import { FC, useEffect, useState } from "react";
import api from "./api/api";
import List from "./components/List";

const FriendPage: FC = () => {
    const [friendList, setFriendList] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setFriendList(await api.getFriends());
        }
        fetchData();
    })
    return (
        <div>
            <List></List>
        </div>
    );
};

export default FriendPage;