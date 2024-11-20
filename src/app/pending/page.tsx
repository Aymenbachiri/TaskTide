import PendingPage from "@/components/pages/PendingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Tasks - TaskTide",
  description:
    "Stay on top of your to-do list with TaskTide’s pending tasks page. View all tasks that need your attention and manage your workload.",
  keywords:
    "pending tasks, to-do list, task manager, pending work, task scheduling",
};

export default function page() {
  return <PendingPage />;
}
