const API_URL = "http://localhost:4000";

export async function login(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAppointments({ search, doctor, status, page }) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (doctor) params.append("doctor", doctor);
  if (status) params.append("status", status);
  if (page) params.append("page", page);

  const res = await fetch(`${API_URL}/appointments?${params.toString()}`);
  return res.json();
}

export async function createAppointment(data) {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateAppointment(id, data) {
  const res = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteAppointment(id) {
  const res = await fetch(`${API_URL}/appointments/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
