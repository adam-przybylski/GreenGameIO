import { useEffect, useState } from "react";
import EditGroupMember from "./EditGroupMember";
import api from "../api/api";

const EditGroupModal = ({ id, group, close }) => {
    const fetchMembers = () => {
        const temp = [];
        for (const property in group.members) {
            temp.push({
                id: property,
                username: group.members[property]
            });
        }
        return temp;
    };
    const editGroup = () => {
        api.editGroup(id, group, {
            description: groupDescription,
            name: groupName,
            ownerId: group.ownerId
        });
        close();
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setGroupMembers(fetchMembers());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const [groupMembers, setGroupMembers] = useState(fetchMembers());
    const [groupName, setGroupName] = useState(group.name);
    const [groupDescription, setGroupDescription] = useState(group.description);
    return (
        <div id="modal-background">
            <div id="modal">
                <div id="heading">
                    <button onClick={close}>
                        <svg id="close-button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path stroke="black" strokeWidth="0.3" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                    <h1>Edit group</h1>
                </div>
                <div id="input">
                    <input value={groupName} onChange={e => setGroupName(e.target.value)} type="text" name="name" id="name" placeholder="Edit name"></input>
                     <input value={groupDescription} onChange={e => setGroupDescription(e.target.value)} type="text" name="name" id="description" placeholder="Edit description"></input>
                     <button className="button" onClick={editGroup}>Edit group</button>
                    <div id="group-members">
                        {groupMembers.map((x, _i) => {
                            return <EditGroupMember member={x} id={id} groupID={group.id}></EditGroupMember>
                        })}
                    </div>
                </div>
             </div>
        </div>  
    );
}

export default EditGroupModal;