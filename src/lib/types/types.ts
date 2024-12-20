export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  createdAt?: string;
  dueDate?: string;
  duedate?: string;
};
