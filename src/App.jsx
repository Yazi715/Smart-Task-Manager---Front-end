import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import bgWhite from "./assets/imgs/bg_white.png";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import Login from "./components/Login";
import Signup from "./components/Signup";
import useAutoLogout from "./components/AutoLogout";

function getInitialTasks() {
  const local = localStorage.getItem("tasks");
  return local ? JSON.parse(local) : [];
}

export default function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("token") ? "user" : null
  );
  const [showSignup, setShowSignup] = useState(false);

  const [tasks, setTasks] = useState(getInitialTasks());
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3;
  const [total, setTotal] = useState(0);

useEffect(() => {
  if (!username) return; 
  getTasks(statusFilter, searchTerm, sortBy, page, limit).then((data) => {
    setTasks(data.tasks); 
    setTotal(data.total); 
  });
}, [username, statusFilter, searchTerm, sortBy, page]);


  function handleSaveTask(task) {
    if (task.id || task._id) {
      updateTask(task).then(() => {
        getTasks(statusFilter, searchTerm, sortBy, page, limit).then((data) => {
          setTasks(data.tasks);
          setTotal(data.total);
        });
        setEditingTask(null);
      });
    } else {
      const { _id, id, ...taskData } = task;
      addTask(taskData).then((newTask) => {
        setTasks([...tasks, { ...newTask, id: newTask._id || newTask.id }]);
      });
    }
  }

  useAutoLogout(() => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiry");
  setUsername(null);
}, 10 * 60 * 1000); 

  function handleEditTask(task) {
    setEditingTask(task);
    setActiveTab("form");
  }

  function handleDeleteTask(id) {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
      if (editingTask && editingTask.id === id) setEditingTask(null);
    });
  }

  if (!username) {
    return showSignup ? (
      <Signup onSwitchToLogin={() => setShowSignup(false)} />
    ) : (
      <Login
        onLogin={setUsername}
        onSwitchToSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#d7195c] flex flex-col items-center">
      <img
        src={bgWhite}
        alt="Decorative"
        className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
        style={{ opacity: 0.18 }}
      />
      <button
        className="absolute top-6 right-6 bg-white text-[#d7195c] rounded-lg px-4 py-2 font-semibold shadow hover:bg-[#d7195c] hover:text-white transition"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload(); 
        }}
      >
        Sign Out
      </button>

      <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2 mt-2 select-none drop-shadow-lg">
        Smart Task Manager
      </h2>
      <div className="flex items-stretch justify-center w-full max-w-4xl shadow-2xl rounded-2xl overflow-visible bg-[#d7195c] z-20">
        {/* Vertical Tabs */}
        <div className="flex flex-col py-8 z-20">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex items-center justify-center w-14 h-44 rounded-tl-2xl rounded-bl-2xl font-bold text-lg tracking-widest
              transform -translate-x-5 mb-3 transition-all duration-200 shadow-md
              ${
                activeTab === "form"
                  ? "bg-[#d7195c] text-white"
                  : "bg-white text-[#d7195c] hover:bg-[#d7195c]/80 hover:text-white"
              }`}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            TASK FORM
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center justify-center w-14 h-44 rounded-tl-2xl rounded-bl-2xl font-bold text-lg tracking-widest
              transform -translate-x-5 transition-all duration-200 shadow-md
              ${
                activeTab === "list"
                  ? "bg-[#d7195c] text-white"
                  : "bg-white text-[#d7195c] hover:bg-[#d7195c]/80 hover:text-white"
              }`}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            TASK LIST
          </button>
        </div>
        {/* Main Content Card */}
        <div className=" flex-1 px-12 py-6 flex flex-col justify-center z-20">
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
              <div className="mb-6 flex items-center justify-between space-x-4">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d7195c]"
                  style={{ height: "38px" }}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm w-36 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d7195c] focus:border-[#d7195c]"
                  style={{ height: "38px" }}
                >
                  <option value="">Sort By</option>
                  <option value="createdAt">Created Date</option>
                  <option value="status">Status</option>
                </select>
                <div className="w-32">
                  <div className="flex justify-end">
                    <select
                      id="statusFilter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d7195c] focus:border-[#d7195c]"
                      style={{ height: "38px" }}
                    >
                      <option>All</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
              <div className="flex justify-center items-center mt-4 gap-2">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>
                <span className="px-3 text-sm font-medium text-white">
                  {page} / {Math.ceil(total / limit)}
                </span>
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  disabled={page === Math.ceil(total / limit)}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
