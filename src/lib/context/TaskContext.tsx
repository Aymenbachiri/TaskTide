"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { API_URL } from "../constants";

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  createdAt?: string;
  dueDate?: string;
};

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  task: Task | null;
  getTaskById: (taskId: string) => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  handleInput: (
    name: string,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  openModalForAdd: () => void;
  openModalForEdit: (task: Task) => void;
  activeTask: Task | null;
  closeModal: () => void;
  modalMode: string;
  openProfileModal: () => void;
  activeTasks: Task[];
  completedTasks: Task[];
  profileModal: boolean;
  refreshTasks: () => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const DEFAULT_TASK = {
  id: "",
  title: "",
  description: "",
  completed: false,
  priority: "low",
  dueDate: "",
};

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState("all");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState("");
  const [profileModal, setProfileModal] = useState(false);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data.tasks || []); // Ensure we handle empty response
    } catch (error) {
      console.error("Error getting tasks:", error);
      toast.error("Failed to fetch tasks");
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Add a refresh function that can be called from components
  const refreshTasks = async () => {
    await getTasks();
  };

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({ ...DEFAULT_TASK }); // Use spread to create new object
    setActiveTask(null);
  };

  const openModalForEdit = (taskToEdit: Task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(taskToEdit);
    setTask({ ...taskToEdit }); // Use spread to create new object
  };

  const openProfileModal = () => setProfileModal(true);

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask(null);
  };

  const getTaskById = async (taskId: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`);
      if (!response.ok) throw new Error("Failed to fetch task");
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.error("Error getting task:", error);
      toast.error("Failed to fetch task");
    }
  };

  const createTask = async (newTask: Partial<Task>) => {
    await toast.promise(
      async () => {
        const response = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) throw new Error("Failed to create task");

        const data = await response.json();
        await refreshTasks(); // Refresh the full task list
        return data;
      },
      {
        loading: "Creating task...",
        success: "Task created successfully!",
        error: "Failed to create task.",
      },
    );
  };

  const updateTask = async (updatedTask: Task) => {
    if (!updatedTask.id) {
      toast.error("Invalid task ID");
      return;
    }

    await toast.promise(
      async () => {
        const response = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });

        if (!response.ok) throw new Error("Failed to update task");

        await refreshTasks(); // Refresh the full task list
        const data = await response.json();
        return data;
      },
      {
        loading: "Updating task...",
        success: "Task updated successfully!",
        error: "Failed to update task.",
      },
    );
  };

  const deleteTask = async (taskId: string) => {
    await toast.promise(
      async () => {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete task");

        await refreshTasks(); // Refresh the full task list
      },
      {
        loading: "Deleting task...",
        success: "Task deleted successfully!",
        error: "Failed to delete task.",
      },
    );
  };

  const handleInput =
    (key: keyof Task) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      if (!e?.target) return;

      let value: string | boolean = e.target.value;

      // Handle boolean values from select elements
      if (
        e.target.type === "select-one" &&
        (value === "true" || value === "false")
      ) {
        value = value === "true";
      }

      setTask((prevTask) => ({
        ...(prevTask || DEFAULT_TASK),
        [key]: value,
      }));
    };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  // Initial data fetch
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        activeTasks,
        completedTasks,
        profileModal,
        refreshTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
