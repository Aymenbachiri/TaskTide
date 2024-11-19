import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Task } from "../types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filteredTasks = (tasks: Task[], priority: string) => {
  const filteredTasks = () => {
    switch (priority) {
      case "low":
        return tasks.filter((task) => task.priority === "low");
      case "medium":
        return tasks.filter((task) => task.priority === "medium");
      case "high":
        return tasks.filter((task) => task.priority === "high");
      default:
        return tasks;
    }
  };

  return filteredTasks();
};

export const overdueTasks = (tasks: Task[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  });
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
