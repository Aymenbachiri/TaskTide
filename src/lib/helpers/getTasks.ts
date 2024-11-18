import { API_URL } from "../constants";

export async function getTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);

    if (!res.ok) {
      console.error(`Failed to fetch tasks: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}
