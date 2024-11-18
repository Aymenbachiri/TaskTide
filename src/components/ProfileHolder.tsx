"use client";

import { useTasks } from "@/lib/context/TaskContext";

export function ProfileHolder({ children }: { children: React.ReactNode }) {
  const { openProfileModal } = useTasks();
  return (
    <div
      onClick={openProfileModal}
      className="flex cursor-pointer items-center gap-3 rounded-[0.8rem] border-2 border-transparent bg-[#E6E6E6]/20 px-2 py-4 transition duration-300 ease-in-out hover:border-2 hover:border-white hover:bg-[#E6E6E6]/50"
    >
      {children}
    </div>
  );
}
