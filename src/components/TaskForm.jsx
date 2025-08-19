import React, { useState, useEffect } from "react";

const statusOptions = ["Pending", "In Progress", "Completed"];

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      ...editingTask,
      title: title.trim(),
      description: description.trim(),
      status,
    });
    if (!editingTask) {
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }

  return (
   <div className=" bg-[#d7195c] p-6 flex flex-col items-center overflow-auto">
  <form
    onSubmit={handleSubmit}
    className="max-w-2xl w-full p-10 bg-white rounded-3xl shadow-xl flex flex-col space-y-6 mx-auto max-h-[90vh] overflow-y-auto"
  >
        {" "}
        <h2 className="text-3xl font-bold text-[#d7195c] text-center">
          Task Form
        </h2>
        <input
          type="text"
          placeholder="Task Title (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-[#d7195c] text-white rounded-lg font-semibold shadow hover:bg-rose-700 transition"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-gray-400 text-white rounded-lg font-semibold shadow hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
