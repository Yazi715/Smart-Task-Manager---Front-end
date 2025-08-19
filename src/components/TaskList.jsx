import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0)
    return (
      <div className="bg-white rounded-3xl p-10 max-w-2xl w-full shadow-xl text-center text-gray-500">
        No tasks available.
      </div>
    );

  return (
    <div className="bg-white rounded-3xl p-10 max-w-3xl w-full shadow-xl">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
