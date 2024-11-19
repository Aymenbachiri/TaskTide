"use client";

import { item } from "@/lib/animations/AppearAnimation";
import { useTasks } from "@/lib/context/TaskContext";
import { motion } from "framer-motion";

export function AddNewTaskBtn() {
  const { openModalForAdd } = useTasks();

  return (
    <motion.button
      variants={item}
      className="h-[16rem] w-full rounded-md border-2 border-dashed border-gray-400 py-2 text-lg font-medium text-gray-500 transition duration-200 ease-in-out hover:border-none hover:bg-gray-300"
      onClick={openModalForAdd}
    >
      Add New Task
    </motion.button>
  );
}
