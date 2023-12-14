import { useState } from "react";
import api from "../api/api";

const CreateGroupModal = ({close, id}) => {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const createGroup = () => {
        api.createGroup(id, {
            description: groupDescription,
            name: groupName,
            ownerId: id
        });
        close();
    }
    return (
        <div>
            <div id="modal-background">
            <div id="modal">
                <div id="heading">
                    <button onClick={close}>
                        <svg id="close-button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path stroke="black" strokeWidth="0.3" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                    <h1>Create group</h1>
                </div>
                <div id="input">
                   <input value={groupName} type="text" name="group-name" id="group-name" placeholder="Group name" onChange={evt => setGroupName(evt.target.value)}></input>
                   <input value={groupDescription} type="text" name="group-description" id="group-description" placeholder="Group description" onChange={evt => setGroupDescription(evt.target.value)}/>
                   <button className="button" onClick={createGroup}>Create group</button>
                </div>
             </div>
        </div> 
        </div>
    )
};

export default CreateGroupModal;