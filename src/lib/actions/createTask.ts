"use server";
import "server-only";

import { API_URL } from "../constants";
import { taskSchema } from "../schema/taskSchema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createTask(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      success: false,
      message: "You are not logged in",
      error: "You are not logged in",
    };
  }
  const validatedFields = taskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    completed: formData.get("completed") === "true",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid task data",
    };
  }

  try {
    const response = await fetch(`${API_URL}/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create task");
    }

    const task = await response.json();

    return {
      success: true,
      task: task,
      message: "Task created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create task",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
