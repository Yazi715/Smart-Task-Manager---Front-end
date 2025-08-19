import React from "react";

export default function TaskItem({ task, onEdit, onDelete }) {

  const statusBorderColors = {
    Pending: "border-yellow-400",
    "In Progress": "border-blue-600",
    Completed: "border-green-600",
  };

  const borderColorClass = statusBorderColors[task.status] || "border-gray-400";

  return (
    <div
      className={`flex justify-between items-start bg-gray-50 border-l-4 rounded-md p-4 mb-4 hover:shadow-md transition ${borderColorClass}`}
    >
      <div>
        <div className="text-lg font-semibold mb-1">
          {task.title} <span className="text-gray-600 font-normal">({task.status})</span>
        </div>
        {task.description && <div className="mb-1">{task.description}</div>}
        <div className="text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleString()}</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
