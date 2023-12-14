import { FC, useEffect, useState } from "react";
import api from "./api/api";
import List from "./components/List";
import { useParams } from "react-router-dom";

const FriendPage: FC = () => {
    
    return (
        <div>
            <List></List>
        </div>
    );
};

export default FriendPage;