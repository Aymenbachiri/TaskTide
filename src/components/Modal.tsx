"use client";
import { useTasks } from "@/lib/context/TaskContext";
import { useDetectOutside } from "@/lib/hooks/useDetectOutside";
import { Task } from "@/lib/types/types";
import { useEffect, useRef } from "react";

export function Modal() {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTasks();
  const ref = useRef(null);

  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleInput("setTask")(activeTask as any);
    }
  }, [modalMode, activeTask, handleInput]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalMode === "edit") {
      updateTask(task as Task);
    } else if (modalMode === "add") {
      createTask(task as Task);
    }
    closeModal();
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full overflow-hidden bg-[#333]/30">
      <form
        action=""
        className="absolute left-1/2 top-1/2 flex w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-white px-6 py-5 shadow-md dark:bg-[#0D0D0D]"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="rounded-md border bg-[#F9F9F9] p-2 dark:bg-[#1A1A1A]"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task?.title}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className="resize-none rounded-md border bg-[#F9F9F9] p-2 dark:bg-[#1A1A1A]"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task?.description}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <select
            className="cursor-pointer rounded-md border bg-[#F9F9F9] p-2 dark:bg-[#1A1A1A]"
            name="priority"
            value={task?.priority}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            className="rounded-md border bg-[#F9F9F9] p-2 dark:bg-[#1A1A1A]"
            type="date"
            name="dueDate"
            value={task?.dueDate || ""}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <div className="flex items-center justify-between rounded-md border bg-[#F9F9F9] p-2 dark:bg-[#1A1A1A]">
            <label htmlFor="completed">Completed</label>
            <div>
              <select
                className="cursor-pointer rounded-md border bg-[#212121] p-2 dark:bg-[#1A1A1A]"
                name="completed"
                value={task?.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`w-full rounded-md py-2 text-white transition duration-200 ease-in-out hover:bg-blue-500 ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
