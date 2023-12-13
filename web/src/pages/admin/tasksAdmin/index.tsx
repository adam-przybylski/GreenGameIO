import { FC, useEffect, useState } from "react";
import { api } from "../../../api/api.config.ts";
import { TaskType } from "../../../types/taskType.ts";
import Button from "../../../components/Button.tsx";

const AdminTasks: FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    api.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  
  const handleDeleteTask = (taskId: number) => {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name}
            <Button label="Delete" onClick={() => handleDeleteTask(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTasks;