import { FC, ReactNode, MouseEvent } from "react";

type props = {
    children: ReactNode,
    message: string,
    onClick: (event: MouseEvent<HTMLDivElement>, message: string) => void
};


const SubPanel: FC<props> = ({ children, message, onClick }) => {
    return (
        <div onClick={(event) => onClick(event, message)} className="bg-white border-nice-green border-2 w-52 h-2/4 font-bold hover:cursor-pointer flex items-center justify-center rounded-md">
            {children}
        </div>
    );
}

export default SubPanel;