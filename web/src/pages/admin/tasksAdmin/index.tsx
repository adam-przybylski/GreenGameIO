import { FC, useEffect, useState } from "react";
import { api } from "../../../api/api.config.ts";
import { TaskType } from "../../../types/taskType.ts";
import { MdAdd } from "react-icons/md";
import TaskTable from "../../../components/TaskTable.tsx";
import TaskForm from "../../../components/TaskForm.tsx";

const AdminTasks: FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null)

  useEffect(() => {
    api.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  
  const handleDeleteTask = (taskId: number | undefined) => {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);

  const toggleTaskExpansion = (taskId: number | undefined) => {
    setExpandedTasks((prevExpandedTasks) => {
      if (taskId !== undefined) {
        if (prevExpandedTasks.includes(taskId)) {
          return prevExpandedTasks.filter((id) => id !== taskId) as number[];
        } else {
          return [...prevExpandedTasks, taskId] as number[];
        }
      } else {

        return prevExpandedTasks;
      }
    });
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
    setEditingTask(null);
  };

  const handleEditTask = (taskId: number | undefined) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setIsModalOpen(true);
    }
  };

  const handleFormSubmit = (task: TaskType) => {
    setIsModalOpen(false);

    if (editingTask) {
      api.put(`/tasks/${task.id}`, task)
      .then((response) => {
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? response.data : t)));
      })
      .catch(error => {
        console.error(error);
      })
    } else {
      api.post(`/tasks`, task)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      })
      .catch(error => {
        console.error(error);
      })
    }
  };

  const handleFormCancel = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="bg-neutral-200 flex justify-center flex-col w-full">
      <h2 className="text-center font-semibold">Lista Zadań</h2>
      <button className="hover:invert ml-4 p-4" onClick={() => handleAddTask()}>
        <MdAdd />
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <TaskForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              initialTask={editingTask || undefined}
            />
          </div>
        </div>
      )}
     
      <TaskTable
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        toggleTaskExpansion={toggleTaskExpansion}
        expandedTasks={expandedTasks}
      />
    </div>
  );
};

export default AdminTasks;