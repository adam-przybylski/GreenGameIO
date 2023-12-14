import { FC } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton: FC = () => {
    const navigation = useNavigate();

    const handleClick = () => {
        navigation("/login")
    }

    return (
        <button onClick={handleClick}>
            Zaloguj się
        </button>
    );
}

export default LoginButton;