import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FaGamepad, FaUser } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { IconType } from "react-icons";
import { classNames } from "../utils/tailwind";

type MenuItem = {
  to: string;
  icon: IconType;
  label: string;
};

const Nav: FC = () => {
  const menuItems: MenuItem[] = [
    { to: "games", icon: FaGamepad, label: "Games" },
    { to: "quizes", icon: MdQuiz, label: "Quizes" },
    { to: "games", icon: FaGamepad, label: "Games" },
    { to: "quizes", icon: MdQuiz, label: "Quizes" },
    { to: "account", icon: FaUser, label: "Profile" },
  ];

  return (
    <div className="h-full flex items-center justify-center w-2/3">
      <ul className="w-full flex flex-row justify-evenly">
        {menuItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                classNames(
                  "hover:text-green-500 flex items-center flex-col",
                  isActive ? "text-green-500" : "text-white"
                )
              }
            >
              <Icon className="h-14 w-14" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
