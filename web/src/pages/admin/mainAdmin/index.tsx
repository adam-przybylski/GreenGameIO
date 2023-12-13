import { FC } from "react";
import SubPanel from "../../../components/SubPanel";
import { useNavigate } from "react-router-dom";

const AdminMain: FC = () => {

    const navigate = useNavigate();

    const handleSubPanelClick = (event: React.MouseEvent<HTMLDivElement>, message: string) => {
        const path = `/admin/${message}`;
        console.log(event);
        navigate(path);
    }

    return (
        <>
            <SubPanel onClick={handleSubPanelClick} message="users">
                <p>Użytkownicy</p>
            </SubPanel>
            <SubPanel onClick={handleSubPanelClick} message="quizzes">
                <p>Quizy</p>
            </SubPanel>
            <SubPanel onClick={handleSubPanelClick} message="tasks">
                <p>Zadania codzienne</p>
            </SubPanel>
        </>
    );
}

export default AdminMain;