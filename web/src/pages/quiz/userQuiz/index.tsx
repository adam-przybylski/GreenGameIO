import {FC} from "react";
import {api} from "../../../api/api.config.ts";

const QuizEditor: FC = () => {

    api
        .get("/quizzes")
        .then(function (response) {
            console.log(response);
        });

    return (
        <div>
            <h1>Quiz Details</h1>
        </div>
    );
};

export default QuizEditor;
