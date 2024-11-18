import type { Task } from "../types/types";
import { getTasks } from "./getTasks";

export async function getActiveTasks() {
  const tasks: Task[] = await getTasks();
  const activeTasks = tasks.filter((task) => !task.completed);
  return activeTasks;
}
