import { API_URL } from "../constants";

export async function getTaskById(taskId: string) {
  try {
    const res = await fetch(`${API_URL}/tasks/${taskId}`);

    if (!res.ok) {
      console.error(`Failed to fetch task: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch task: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching task:", error);
    throw new Error("Failed to fetch task");
  }
}
