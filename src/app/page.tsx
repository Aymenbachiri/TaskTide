import HomePage from "@/components/pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskTide - Manage Your Tasks Efficiently",
  description:
    "TaskTide is the ultimate task manager for organizing and completing your tasks. Stay productive with an easy-to-use interface to manage tasks and deadlines.",
  keywords:
    "task manager, task management, productivity app, task organization, to-do list app",
};

export default function Home() {
  return <HomePage />;
}
