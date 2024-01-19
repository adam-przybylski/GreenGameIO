import React, {FC, useState} from "react";
import SolvedQuizzes from "./userQuiz/solvedQuizzes";
import UnsolvedQuizzes from "./userQuiz/unsolvedQuizzes";
import QuizNav from "../../components/QuizNav.tsx";
import QuizSubPanel from "../../components/QuizSubPanel.tsx";

const panels = {
    solved: <SolvedQuizzes/>,
    unsolved: <UnsolvedQuizzes/>,
} as const;

export type Panel = keyof typeof panels;

const QuizLayout: FC = () => {
    const [panel, setPanel] = useState<Panel>("unsolved");

    const handleSubPanelClick = (
        _event: React.MouseEvent<HTMLDivElement>,
        message: Panel
    ) => {
        setPanel(message);
    };

    return (
        <>
            <QuizNav>
                <QuizSubPanel onClick={handleSubPanelClick} message="unsolved">
                    <p>Quizy Nierozwiązane </p>
                </QuizSubPanel>
                <QuizSubPanel onClick={handleSubPanelClick} message="solved">
                    <p>Quizy Rozwiązane </p>
                </QuizSubPanel>
            </QuizNav>
            <main>{panels[panel]}</main>
        </>
    );
};

export default QuizLayout;
