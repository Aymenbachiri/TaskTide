import type { Task } from "../types/types";
import { getTasks } from "./getTasks";

export async function getCompletedTasks() {
  const tasks: Task[] = await getTasks();
  const completedTasks = tasks.filter((task) => task.completed);
  return completedTasks;
}
