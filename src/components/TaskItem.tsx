"use client";

import { deleteTask } from "@/lib/actions/deleteTask";
import { useTasks } from "@/lib/context/TaskContext";
import { getPriorityColor } from "@/lib/helpers/getPriorityColor";
import { EditIcon } from "@/lib/icons/EditIcon";
import { StarIcon } from "@/lib/icons/StarIcon";
import { TrashIcon } from "@/lib/icons/TrashIcon";
import type { Task } from "@/lib/types/types";
import { cn } from "@/lib/utils/utils";

export function TaskItem({ task }: { task: Task }) {
  const { openModalForEdit } = useTasks();

  return (
    <main className="flex h-[16rem] flex-col gap-4 rounded-lg border-2 border-white bg-[#f9f9f9] px-4 py-3 shadow-sm dark:border-gray-500 dark:bg-[#1A1A1A]">
      <section>
        <h4 className="text-2xl font-bold">{task.title}</h4>
        <p>{task.description}</p>
      </section>
      <div className="mt-auto flex items-center justify-between">
        <p className="text-sm text-gray-400">{task.createdAt as string}</p>
        <p
          className={cn("text-sm font-bold", getPriorityColor(task.priority!))}
        >
          {task.priority}
        </p>
        <section className="flex items-center gap-2">
          <button
            className={cn(task.completed ? "text-yellow-400" : "text-gray-400")}
          >
            <StarIcon />
          </button>
          <button
            onClick={() => {
              openModalForEdit(task);
            }}
            className="text-[#00A1F1]"
          >
            <EditIcon />
          </button>
          <button
            onClick={async () => {
              await deleteTask(task.id);
            }}
            className="text-[#F65314]"
          >
            <TrashIcon />
          </button>
        </section>
      </div>
    </main>
  );
}
