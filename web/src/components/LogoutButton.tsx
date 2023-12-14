import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
    logoutUser: () => void,
}

const LogoutButton: FC<LogoutButtonProps> = ({ logoutUser }) => {
    const navigation = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigation("/login");
    }

    return (
        <button onClick={handleLogout}>
            Wyloguj się
        </button>
    );
}

export default LogoutButton;