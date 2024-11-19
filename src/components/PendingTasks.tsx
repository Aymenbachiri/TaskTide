"use client";

import { useTasks } from "@/lib/context/TaskContext";
import type { Task } from "@/lib/types/types";
import { filteredTasks } from "@/lib/utils/utils";
import { useEffect } from "react";
import { TaskItem } from "./TaskItem";

export function PendingTasks({ tasks }: { tasks: Task[] }) {
  const { priority, setPriority } = useTasks();
  const pendingTasks = tasks.filter((task: Task) => !task.completed);
  const filtered = filteredTasks(pendingTasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <>
      {filtered.map((task: Task, i: number) => (
        <TaskItem key={i} task={task} />
      ))}
    </>
  );
}
