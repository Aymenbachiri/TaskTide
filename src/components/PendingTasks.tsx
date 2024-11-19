"use client";

import { useTasks } from "@/lib/context/TaskContext";
import type { Task } from "@/lib/types/types";
import { filteredTasks } from "@/lib/utils/utils";
import { useEffect } from "react";
import { TaskItem } from "./TaskItem";

export function PendingTasks() {
  const { priority, setPriority } = useTasks();
  const tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "This is a task description",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Task 2",
      description: "This is a task description",
      completed: true,
      priority: "low",
    },
    {
      id: "3",
      title: "Task 3",
      description: "This is a task description",
      completed: false,
      priority: "medium",
    },
    {
      id: "4",
      title: "Task 4",
      description: "This is a task description",
      completed: false,
      priority: "low",
    },
  ];

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
