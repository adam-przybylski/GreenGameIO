import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FaGamepad, FaWrench } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { IconType } from "react-icons";
import { classNames } from "../utils/tailwind";
import LogoutButton from "./LogoutButton";
import { logoutUser } from "../api/logout"
import LoginButton from "./LoginButton";
import {BiAward} from "react-icons/bi";
import {IoNotificationsSharp} from "react-icons/io5";
import { FaTasks } from "react-icons/fa";

type MenuItem = {
    to: string;
    icon: IconType;
    label: string;
};

const Nav: FC = () => {
  const menuItems: MenuItem[] = [
    { to: "games", icon: FaGamepad, label: "Games" },
    { to: "quizzes", icon: MdQuiz, label: "Quizes" },
    //{ to: "account", icon: FaUser, label: "Profile" },
      { to: "user/notifications", icon: IoNotificationsSharp, label: "Notifications" },
      { to: "user/tasks", icon: FaTasks, label: "Daily Tasks" },
      { to: "awards", icon: BiAward, label: "Awards" },
    { to: "admin", icon: FaWrench, label: "Admin" },
  ];

  return (
    <div className="h-full flex w-full">
      <ul className="w-full flex flex-col items-center">
        {menuItems.map(({ to, icon: Icon, label }) => (
          <li key={to} className="w-full p-2">
            <NavLink
              to={to}
              className={({ isActive }) =>
                classNames(
                  "hover:text-green-500 flex items-center flex-col p-2",
                  isActive
                    ? "text-green-500 border border-green-500 rounded-md"
                    : "text-white"
                )
              }
            >
              <Icon className="h-10 w-10" />
              {label}
            </NavLink>
          </li>
        ))}
        {localStorage.getItem("token") != null ? <li>
          <LogoutButton logoutUser={logoutUser} />
        </li> : <LoginButton />}

      </ul>
    </div>
  );
};

export default Nav;
