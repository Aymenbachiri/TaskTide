"use client";

import { useTasks } from "@/lib/context/TaskContext";

export function CompletedTasksSpan() {
  const { completedTasks } = useTasks();
  return (
    <span className="text-4xl font-medium text-[#333] dark:text-white">
      {completedTasks.length}
    </span>
  );
}
