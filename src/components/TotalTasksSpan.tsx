"use client";

import { useTasks } from "@/lib/context/TaskContext";

export function TotalTasksSpan() {
  const { totalTasks } = useTasks();
  return (
    <span className="text-4xl font-medium text-[#333] dark:text-white">
      {totalTasks}
    </span>
  );
}
