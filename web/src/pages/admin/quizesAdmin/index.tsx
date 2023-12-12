import { FC, useState, useEffect } from "react";
import { api } from "../../../api/api.config.ts";

const AdminQuizzes: FC = () => {
    const [apiResponse, setApiResponse] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data when the component mounts
        api.get("/quizzes")
            .then(function (response) {
                setApiResponse(JSON.stringify(response.data, null, 2)); // Convert to JSON string with indentation
            })
            .catch(function (error) {
                console.error("Error fetching quizzes:", error);
                setApiResponse("Error fetching quizzes."); // Display an error message
            });
    }, []); // The empty dependency array ensures the effect runs only once when the component mounts

    return (
        <div>
            <h2>API Response</h2>
            <pre>{apiResponse}</pre>
        </div>
    );
};

export default AdminQuizzes;
