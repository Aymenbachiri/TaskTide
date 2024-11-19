"use client";

import { useTasks } from "@/lib/context/TaskContext";
import type { Task } from "@/lib/types/types";
import { TaskItem } from "./TaskItem";
import { useEffect } from "react";
import { filteredTasks, overdueTasks } from "@/lib/utils/utils";

export function OverdueTasks({ tasks }: { tasks: Task[] }) {
  const { priority, setPriority } = useTasks();

  const overdue = overdueTasks(tasks);

  const filtered = filteredTasks(overdue, priority);

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
