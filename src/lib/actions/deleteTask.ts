"use server";
import "server-only";
import { API_URL } from "../constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function deleteTask(taskId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      success: false,
      message: "You are not logged in",
      error: "You are not logged in",
    };
  }

  if (!taskId) {
    return {
      success: false,
      message: "Task ID is required",
    };
  }

  try {
    const response = await fetch(`${API_URL}/task/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete task");
    }

    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete task",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
