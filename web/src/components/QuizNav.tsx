import {FC, ReactNode} from "react";

type props = {
    children: ReactNode,
}

const QuizNav: FC<props> = ({children}) => {
    return (
        <nav className="flex w-[95vw] justify-around mt-3 h-16">
            {children}
        </nav>
    );
}

export default QuizNav;