const API_BASE = "http://localhost:3000"; // Change to your backend URL/port

// api.js
export async function getTasks(status = "All") {
  let url = `${API_BASE}/tasks`;
  if (status && status !== "All") url += `?status=${encodeURIComponent(status)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.map(task => ({ ...task, id: task._id || task.id }));
}


export async function addTask(task) {
  // Don't send id for new tasks!
  const { id, ...rest } = task;
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
  });
  const data = await res.json();
  return { ...data, id: data._id };
}


export async function updateTask(task) {
  const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
}
