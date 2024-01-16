import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
    logoutUser: () => void,
    className?: string,
}

const LogoutButton: FC<LogoutButtonProps> = ({ logoutUser, className }) => {
    const navigation = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigation("/login");
    }

    return (
        <button className={className} onClick={handleLogout}>
            Wyloguj się
        </button>
    );
}

export default LogoutButton;