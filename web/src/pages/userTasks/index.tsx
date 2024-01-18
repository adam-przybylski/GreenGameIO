import { FC, useEffect, useState } from "react";
import { api } from "../../api/api.config";
import { UserTask } from "../../types/UserTask";
import Button from "../../components/Button";

const UserTasks: FC = () => {
  const [data, setData] = useState<UserTask[]>([]);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const handleGet = () => {
    const endpoint = showAllTasks ? "/usertasks" : "/usertasks/active";
    api.get(endpoint).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    handleGet();
  }, [showAllTasks]);

  const handleCompleteTask = (taskId: number | undefined) => {
    api.post(`/usertasks/${taskId}/complete`).then(() => {
      handleGet();
    });
  };

  const sortedData = data.slice().sort((a) => (a.active ? -1 : 1));

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4 text-center">ZADANIA CODZIENNE</h1>

      {sortedData.map((task, index) => (
        <div>
            <div key={task.id} className={`mb-4 p-4 border rounded shadow ${task.done ? 'bg-green-200' : ''}`}>
                <h2 className={`text-xl font-bold ${task.done ? 'text-gray-800' : ''}`}>{task.task.name}</h2>
                <p className={`${task.done ? 'text-gray-500' : ''}`}>{task.task.description}</p>
                <p className={`${task.done ? 'text-gray-500' : ''}`}>Punkty doświadczenia: {task.task.expValue}</p>
                
                {task.active && !task.done && (
                    <Button
                    type="button"
                    label="Odznacz Zadanie"
                    className="bg-nice-green w-full mt-2 h-9 rounded-md font-medium text-white"
                    onClick={() => handleCompleteTask(task.id)}
                    />
                )}
                
                {task.done && (
                    <div className="text-green-500 mt-2">
                    <span>&#10003; Zadanie ukończone {!task.active ? ", gdy było aktywne" : ""}</span>
                    </div>
                )}
            </div>
            {index === 2 && (
                <Button
                    type="button"
                    label={showAllTasks ? "Pokaż Mniej" : "Pokaż Wszystkie"}
                    className="bg-nice-green w-full mb-4 h-9 rounded-md font-medium text-white"
                    onClick={() => setShowAllTasks(!showAllTasks)}
                />
            )}
         </div>
      ))}

      
    </div>
  );
};

export default UserTasks;
