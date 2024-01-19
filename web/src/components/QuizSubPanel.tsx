import { FC, ReactNode, MouseEvent } from "react";
import { Panel } from "../pages/quiz/QuizLayout.tsx";

type props = {
    children: ReactNode,
    message: Panel,
    onClick: (event: MouseEvent<HTMLDivElement>, message: Panel) => void
};


const QuizSubPanel: FC<props> = ({ children, message, onClick }) => {
    return (
        <div onClick={(event) => onClick(event, message)} className="bg-transparent border-green-600 border-2 w-48 h-3/4 font-bold hover:cursor-pointer
        flex items-center justify-center rounded-md text-white">
            {children}
        </div>
    );
}

export default QuizSubPanel;