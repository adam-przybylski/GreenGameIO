import { FC } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton: FC = () => {
    const navigation = useNavigate();

    const handleClick = () => {
        navigation("/login")
    }

    return (
        <button className="hover:text-green-500 w-full flex items-center flex-col p-2" onClick={handleClick}>
            Zaloguj się
        </button>
    );
}

export default LoginButton;