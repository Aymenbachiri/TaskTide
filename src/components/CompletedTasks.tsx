"use client";

import type { Task } from "@/lib/types/types";
import { TaskItem } from "./TaskItem";
import { useTasks } from "@/lib/context/TaskContext";
import { filteredTasks } from "@/lib/utils/utils";
import { useEffect } from "react";

export function CompletedTasks() {
  const { priority, setPriority } = useTasks();
  const completedTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "This is a task description",
      completed: true,
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
      completed: true,
      priority: "medium",
    },
    {
      id: "4",
      title: "Task 4",
      description: "This is a task description",
      completed: true,
      priority: "low",
    },
  ];

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
