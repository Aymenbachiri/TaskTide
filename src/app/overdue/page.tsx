import OverduePage from "@/components/pages/OverduePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overdue Tasks - TaskTide",
  description:
    "See all your overdue tasks in TaskTide and take immediate action. Never miss a deadline again by prioritizing overdue tasks.",
  keywords:
    "overdue tasks, missed deadlines, task overdue, task urgency, task manager",
};

export default function page() {
  return <OverduePage />;
}
