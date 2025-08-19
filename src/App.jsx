import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import bgWhite from "./assets/imgs/bg_white.png";

function getInitialTasks() {
  const local = localStorage.getItem("tasks");
  return local ? JSON.parse(local) : [];
}

export default function App() {
  const [tasks, setTasks] = useState(getInitialTasks());
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState("form");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleSaveTask(task) {
    if (task.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
      setEditingTask(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          ...task,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }

  function handleEditTask(task) {
    setEditingTask(task);
    setActiveTab("form");
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
    if (editingTask && editingTask.id === id) setEditingTask(null);
  }

  return (
    <div className="min-h-screen bg-[#d7195c] flex flex-col items-center">
      <img
      src={bgWhite}
      alt="Decorative"
      className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
      style={{ opacity: 0.18 }}
    />
      <h2 className="text-4xl font-extrabold tracking-tight text-white mb-14 mt-8 select-none drop-shadow-lg">
        Smart Task Manager
      </h2>
      <div className="flex items-stretch justify-center w-full max-w-4xl shadow-2xl rounded-2xl overflow-visible bg-[#d7195c] z-20">
        {/* Vertical Tabs */}
        <div className="flex flex-col py-8 z-20">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex items-center justify-center w-14 h-44 rounded-tl-2xl rounded-bl-2xl font-bold text-lg tracking-widest
              transform -translate-x-5 mb-3 transition-all duration-200 shadow-md
              ${activeTab === "form"
                ? "bg-[#d7195c] text-white"
                : "bg-white text-[#d7195c] hover:bg-[#d7195c]/80 hover:text-white"}`}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            TASK FORM
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center justify-center w-14 h-44 rounded-tl-2xl rounded-bl-2xl font-bold text-lg tracking-widest
              transform -translate-x-5 transition-all duration-200 shadow-md
              ${activeTab === "list"
                ? "bg-[#d7195c] text-white"
                : "bg-white text-[#d7195c] hover:bg-[#d7195c]/80 hover:text-white"}`}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            TASK LIST
          </button>
        </div>
        {/* Main Content Card */}
        <div className=" flex-1 px-12 py-10 flex flex-col justify-center z-20">
          {activeTab === "form" && (
            <>

              <TaskForm
                onSave={handleSaveTask}
                editingTask={editingTask}
                onCancel={() => setEditingTask(null)}
              />
            </>
          )}
          {activeTab === "list" && (
            <>
              {/* <h3 className="text-3xl font-bold text-[#d7195c] text-center mb-8">Task List</h3> */}
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
