"use client";
import { useTasks } from "@/lib/context/TaskContext";
import type { Task } from "@/lib/types/types";
import { filteredTasks } from "@/lib/utils/utils";
import { TaskItem } from "./TaskItem";

export function Tasks() {
  const { priority, tasks } = useTasks();

  const filtered = filteredTasks(tasks, priority);

  return (
    <>
      {filtered.map((task: Task, i: number) => (
        <TaskItem key={i} task={task} />
      ))}
    </>
  );
}
