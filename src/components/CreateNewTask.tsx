"use client";

import { useTasks } from "@/lib/context/TaskContext";

export function CreateNewTask() {
  const { openModalForAdd } = useTasks();

  return (
    <button
      onClick={openModalForAdd}
      className="rounded-[50px] bg-[#3aafae] px-8 py-3 text-white transition-all duration-200 ease-in-out hover:bg-[#00A1F1] hover:text-white"
    >
      Create a new task
    </button>
  );
}
