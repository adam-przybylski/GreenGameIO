import { FC } from "react";
import api from "../api/api";

const Group: FC = ({ group, id, displayAddModal, setClickedGroup, displayModal, setViewedGroup, displayEditGroupModal, setEditGroup }) => {
    const setClickedGroupAndDisplayAddModal = () => {
        setClickedGroup(group.id);
        displayAddModal()
    }
    const setViewedGroupAndDisplayGroup = () => {
        setViewedGroup(group.id);
        displayModal();
    }
    const setEditGroupAndDisplayEditGroup = () => {
        setEditGroup(group.id);
        displayEditGroupModal();
    }
    const deleteGroup = () => {
        api.deleteGroup(id, group);
    };
    return (
        <div className="group" id={group.id} onClick={setViewedGroupAndDisplayGroup}>
            <h2>{group.name}</h2>
            <div id="group-buttons">
                <button className="button" onClick={e => {
                    e.stopPropagation();
                    deleteGroup();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                </button>
                <button className="button" onClick={e => {
                    e.stopPropagation();
                    setClickedGroupAndDisplayAddModal();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                    </svg>
                </button>
                <button className="button" onClick={e => {
                    e.stopPropagation();
                    setEditGroupAndDisplayEditGroup();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
};

export default Group;