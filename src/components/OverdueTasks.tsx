"use client";

import { useTasks } from "@/lib/context/TaskContext";
import type { Task } from "@/lib/types/types";
import { TaskItem } from "./TaskItem";
import { useEffect } from "react";
import { filteredTasks, overdueTasks } from "@/lib/utils/utils";

export function OverdueTasks() {
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
