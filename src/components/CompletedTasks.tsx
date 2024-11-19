"use client";

import type { Task } from "@/lib/types/types";
import { TaskItem } from "./TaskItem";
import { useTasks } from "@/lib/context/TaskContext";
import { filteredTasks } from "@/lib/utils/utils";
import { useEffect } from "react";

export function CompletedTasks({ tasks }: { tasks: Task[] }) {
  const completedTasks = tasks.filter((task) => task.completed);
  const { priority, setPriority } = useTasks();

  const filtered = filteredTasks(completedTasks, priority);

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
