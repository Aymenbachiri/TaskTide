"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "../constants";
import { Task } from "../types/types";

type TasksContextType = {
  tasks: Task[];
  task: Task | null;
  priority: string;
  isEditing: boolean;
  activeTask: Task | null;
  modalMode: string;
  profileModal: boolean;
  getTasks: () => void;
  getTaskById: (id: string) => void;
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setPriority: (priority: string) => void;
  setIsEditing: (editing: boolean) => void;
  handleInput: (
    name: string,
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  openModalForAdd: () => void;
  openModalForEdit: (task: Task) => void;
  openProfileModal: () => void;
  closeModal: () => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [task, setTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState("all");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState("");
  const [profileModal, setProfileModal] = useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask(null);
  };

  const openModalForEdit = (task: Task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask(null);
  };

  const handleInput =
    (name: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      if (name === "setTask") {
        setTask(e);
      } else {
        setTask({ ...task, [name]: e.target.value });
      }
    };

  const getTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error("Error fetching tasks");
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
    }
  };

  const getTaskById = async (taskId: string) => {
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`);
      if (!response.ok) {
        throw new Error("Error fetching task");
      }
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log("Error getting task", error);
    }
  };

  const createTask = async (task: Task) => {
    try {
      const response = await fetch(`${API_URL}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Error creating task");
      }
      const data = await response.json();

      setTasks([...tasks, data]);
      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await fetch(`${API_URL}/task/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Error updating task");
      }
      const data = await response.json();

      const newTasks = tasks.map((tsk) => {
        return tsk?.id === data.id ? data : tsk;
      });

      toast.success("Task updated successfully");

      setTasks(newTasks);
    } catch (error) {
      console.log("Error updating task", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting task");
      }

      const newTasks = tasks.filter((tsk) => tsk.id !== taskId);

      setTasks(newTasks);
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  const contextValue: TasksContextType = {
    task,
    priority,
    isEditing,
    activeTask,
    modalMode,
    profileModal,
    setPriority,
    setIsEditing,
    handleInput,
    openModalForAdd,
    openModalForEdit,
    openProfileModal,
    closeModal,
    tasks,
    deleteTask,
    updateTask,
    createTask,
    getTasks,
    getTaskById,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
