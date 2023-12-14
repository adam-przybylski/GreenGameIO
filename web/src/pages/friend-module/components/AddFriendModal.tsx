import { useEffect, useState } from "react";
import api from "../api/api";
import Friend from "./Friend";
import AddFriend from "./AddFriend";

const AddFriendModal = ({ close, userID, users }) => {
    return (
        <div id="modal-background">
            <div id="modal">
                <div id="heading">
                    <button onClick={close}>
                        <svg id="close-button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path stroke="black" strokeWidth="0.3" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                    <h1>Add friend</h1>
                </div>
                <div id="input">
                   <input type="text" name="username" id="username" placeholder="Filter list"></input>
                </div>
                <div id="data">
                    {users.map((x, i) => {
                        return <AddFriend user={x} userID={userID}></AddFriend>
                    })}
                 </div>
             </div>
        </div>  
    )
};

export default AddFriendModal;