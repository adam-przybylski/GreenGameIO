import {FC, useState} from "react";
import {NavLink} from "react-router-dom";
import {FaGamepad, FaTasks, FaUser, FaWrench} from "react-icons/fa";
import {IconType} from "react-icons";
import {classNames} from "../utils/tailwind";
import LogoutButton from "./LogoutButton";
import {logoutUser} from "../api/logout"
import LoginButton from "./LoginButton";
import {BiAward} from "react-icons/bi";
import {IoNotificationsSharp} from "react-icons/io5";
import AccountModal from "./modals/AccountModal";
import {useUserContext} from "../context/userContext";
import {MdLeaderboard, MdQuiz} from "react-icons/md";



type MenuItem = {
    to: string;
    icon: IconType;
    label: string;
};

const Nav: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {account} = useUserContext();

    const amIAdmin = () => {
        return account?.type === "ADMINISTRATOR";
    }

    const menuItems: MenuItem[] = [
        {to: "games", icon: FaGamepad, label: "Gry"},
        {to: "quizzes", icon: MdQuiz, label: "Quizy"},
        {to: "user/notifications", icon: IoNotificationsSharp, label: "Powiadomienia"},
        {to: "user/tasks", icon: FaTasks, label: "Zadania"},
        {to: "awards", icon: BiAward, label: "Odznaki"},
        {to: "leaderboard", icon: MdLeaderboard, label: "Wyniki"},
        {to: "friends", icon: FaUser, label: "Znajomi"}
    ];

    return (
        <div className="h-full flex w-full overflow-auto overflow-y-scroll no-scrollbar">
            <ul className="w-full flex flex-col items-center">
                {menuItems.map(({to, icon: Icon, label}) => (
                    <li key={to} className="w-full p-2">
                        <NavLink
                            to={to}
                            className={({isActive}) =>
                                classNames(
                                    "hover:text-green-500 flex items-center flex-col p-2",
                                    isActive
                                        ? "text-green-500 border border-green-500 rounded-md"
                                        : "text-white"
                                )
                            }
                        >
                            <Icon className="h-10 w-10"/>
                            {label}
                        </NavLink>
                    </li>
                ))}
                {amIAdmin() &&
                    <li className="w-full p-2">
                        <NavLink
                            to="admin"
                            className={({isActive}) =>
                                classNames(
                                    "hover:text-green-500 flex items-center flex-col p-2",
                                    isActive
                                        ? "text-green-500 border border-green-500 rounded-md"
                                        : "text-white"
                                )
                            }
                        >
                            <FaWrench className="h-10 w-10"/>
                            Admin
                        </NavLink>
                    </li>}
                {localStorage.getItem("token") != null ?
                    <>
                        <li className="w-full p-2">
                            <button className="hover:text-green-500 flex items-center flex-col w-full p-2"
                                    onClick={() => setIsOpen(true)}>
                                <FaUser className="h-10 w-10"/>
                                Moje konto
                            </button>
                        </li>
                        <li className="w-full p-2">
                            <LogoutButton className="hover:text-green-500 flex items-center flex-col w-full p-2"
                                          logoutUser={logoutUser}/>
                        </li>
                    </>
                    : <li className="w-full p-2"><LoginButton/></li>}
            </ul>
            {isOpen && <AccountModal reset={() => setIsOpen(false)}/>}
        </div>
    );
};

export default Nav;
