"use client";
import { useTasks } from "@/lib/context/TaskContext";
import { useState } from "react";

export function Filters() {
  const [activeIndex, setActiveIndex] = useState(0);
  const priorities = ["All", "Low", "Medium", "High"];
  const { setPriority } = useTasks();

  return (
    <main className="relative grid grid-cols-4 items-center gap-3 rounded-md border-2 border-white bg-[#F9F9F9] px-2 py-2">
      <span
        className="absolute left-[5px] rounded-md bg-[#EDEDED] transition-all duration-300"
        style={{
          width: "calc(100% / 4 - 10px)",
          height: "calc(100% - 10px)",
          top: "50%",
          transform: `translate(calc(${activeIndex * 100}% + ${
            activeIndex * 10
          }px), -50%)`,
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}
      />
      {priorities.map((priority, index) => (
        <button
          key={index}
          className={`relative z-10 px-1 text-sm font-medium ${
            activeIndex === index ? "text-[#3aafae]" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setPriority(priority.toLowerCase());
          }}
        >
          {priority}
        </button>
      ))}
    </main>
  );
}
