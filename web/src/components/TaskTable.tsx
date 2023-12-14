import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { TaskType } from "../types/taskType";

interface TaskTableProps {
    tasks: TaskType[];
    handleDeleteTask: (taskId: number) => void;
    handleEditTask: (taskId: number) => void;
    toggleTaskExpansion: (taskId: number) => void;
    expandedTasks: number[];
  }

  const TaskTable: React.FC<TaskTableProps> = ({
    tasks,
    handleDeleteTask,
    handleEditTask,
    toggleTaskExpansion,
    expandedTasks,
  }) => {
  return (
    <table className="mx-20  border-collapse border border-slate-500 rounded-lg">
      <thead className="bg-neutral-400">
        <tr>
          <th className="border border-slate-600 px-5 py-3">Id</th>
          <th className="border border-slate-600 px-5 py-3">Nazwa</th>
          <th className="border border-slate-600 px-5 py-3">Wartość</th>
          <th className="border border-slate-600 px-5 py-3">Aktywne</th>
          <th className="border border-slate-600 px-5 py-3">Akcje</th>
        </tr>
      </thead>
      <tbody className="bg-neutral-300">
        {tasks.map(task => (
          <React.Fragment key={task.id}>
            <tr>
              <td className="border border-slate-700 text-center">{task.id}</td>
              <td className="border border-slate-700 text-center">{task.name}</td>
              <td className="border border-slate-700 text-center">{task.expValue}</td>
              <td className="border border-slate-700 text-center">{task.active ? 'TAK' : 'NIE'}</td>
              <td className="border border-slate-700">
                <div className="flex flex-row justify-center">
                  <button className="hover:invert p-4" onClick={() => task.id !== undefined && handleDeleteTask(task.id)}>
                    <MdDeleteForever />
                  </button>
                  <button className="hover:invert p-4" onClick={() => task.id !== undefined && handleEditTask(task.id)}>
                    <MdEdit />
                  </button>
                  <button
                    className="hover:invert p-4"
                    onClick={() => task.id !== undefined && toggleTaskExpansion(task.id)}
                  >
                    Show More
                  </button>
                </div>
              </td>
            </tr>
            {task.id !== undefined && expandedTasks.includes(task.id) && (
              <tr key={`expanded-${task.id}`}>
                <td colSpan={5}>Opis: {task.description}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;