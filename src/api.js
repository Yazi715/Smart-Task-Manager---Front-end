const API_BASE = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

export async function getTasks(status = "All", search = "", sortBy = "", page = 1, limit = 3) {
  let url = `${API_BASE}/tasks?`;
  if (status && status !== "All") url += `status=${encodeURIComponent(status)}&`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (sortBy) url += `sortBy=${encodeURIComponent(sortBy)}&`;
  url += `page=${page}&limit=${limit}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  return data;
}

export async function addTask(task) {
  const { id, ...rest } = task;
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(rest),
  });
  const data = await res.json();
  return { ...data, id: data._id || data.id };
}

export async function updateTask(task) {
  const { id, _id, ...rest } = task;
  const res = await fetch(`${API_BASE}/tasks/${id || _id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(rest),
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
}
