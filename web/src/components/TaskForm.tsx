import React, { useState, useEffect } from "react";
import { TaskType } from "../types/task";
import {
  Typography,
} from "@material-tailwind/react";

interface TaskFormProps {
  onSubmit: (task: TaskType) => void;
  onCancel: () => void;
  initialTask?: TaskType;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialTask }) => {
  const [task, setTask] = useState<TaskType>(initialTask || { id: 0, name: "", expValue: 0, active: false, description: "" });

  useEffect(() => {
    setTask(initialTask || { id: 0, name: "", expValue: 0, active: true, description: "" });
  }, [initialTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const parsedValue = name === "expValue" ? parseInt(value, 10) : value;

    setTask((prevTask) => ({ ...prevTask, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskToSubmit = { ...task, id: task.id === null ? undefined : task.id };
    onSubmit(taskToSubmit);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-150">
        <form onSubmit={handleSubmit} className="mt-8 mb-2 max-w-screen-lg sm:w-96">
          <Typography variant="h4" color="blue-gray">
            Formularz Zadania
          </Typography>
          <Typography color="gray" className="mt-2 text-base font-normal">
            Wprowadź dane zadania poniżej.
          </Typography>

          <div className="mb-6 mt-4">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Nazwa Zadania
            </Typography>
            <br />
            <input
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              className="border-b-2 border-blue-gray-200 focus:border-gray-900 p-2 w-full focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Wartość Zadania
            </Typography>
            <br />
            <input
              type="number"
              name="expValue"
              value={task.expValue.toString()}
              onChange={handleChange}
              className="border-b-2 border-blue-gray-200 focus:border-gray-900 p-2 w-full md:w-80 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={task.active}
                onChange={() => setTask((prevTask) => ({ ...prevTask, active: !prevTask.active }))}
                className="mr-2"
              />
              <span className="text-blue-gray-700">Aktywny</span>
            </label>
          </div>

          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Opis Zadania
            </Typography>
            <br />
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="border-2 border-blue-gray-200 focus:border-gray-900 p-2 w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none"
            >
              Zatwierdź
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 p-2 rounded hover:text-gray-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
       </form>
     </div>
    </div>
  );
}
export default TaskForm;
