import CompletedPage from "@/components/pages/CompletedPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completed Tasks - TaskTide",
  description:
    "Review all your completed tasks in TaskTide. Easily track your progress and accomplishments as you cross tasks off your list.",
  keywords:
    "completed tasks, task completion, task management, productivity, accomplishments",
};

export default function page() {
  return <CompletedPage />;
}
