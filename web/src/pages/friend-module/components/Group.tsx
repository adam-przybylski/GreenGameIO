import { FC } from "react";
import "../styles/Group.css"

const Group: FC = ({ group }) => {
    return (
        <div className="group">
            <h2>{group}</h2>
        </div>
    )
};

export default Group;