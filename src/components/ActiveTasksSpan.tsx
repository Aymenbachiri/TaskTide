"use client";

import { useTasks } from "@/lib/context/TaskContext";

export function ActiveTasksSpan() {
  const { activeTasks } = useTasks();
  return (
    <span className="text-4xl font-medium text-[#333] dark:text-white">
      {activeTasks.length}
    </span>
  );
}
