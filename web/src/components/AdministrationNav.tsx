import { FC, ReactNode } from "react";

type props = {
    children: ReactNode,
}

const AdministrationNav: FC<props> = ({ children }) => {
    return (
        <nav className="flex w-screen justify-around mt-5 h-16">
            {children}
        </nav>
    );
}

export default AdministrationNav;