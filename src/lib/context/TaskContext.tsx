"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";

// Define types
type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  task: Partial<Task>;
  getTask: (taskId: string) => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  priority: string;
  setPriority: Dispatch<SetStateAction<string>>;
  handleInput: (
    name: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  openModalForAdd: () => void;
  openModalForEdit: (task: Task) => void;
  activeTask: Task | null;
  closeModal: () => void;
  modalMode: string;
  openProfileModal: () => void;
  activeTasks: Task[];
  completedTasks: Task[];
  profileModal: boolean;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const serverUrl = "https://taskfyer.onrender.com/api/v1";

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useKindeBrowserClient();
  const userId = user?.id;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<Partial<Task>>({});

  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState("all");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState("");
  const [profileModal, setProfileModal] = useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
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
    setTask({});
  };

  // get tasks
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error);
      toast.error("Failed to fetch tasks");
    }
    setLoading(false);
  };

  // get task
  const getTask = async (taskId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/task/${taskId}`);
      if (!response.ok) throw new Error("Failed to fetch task");
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log("Error getting task", error);
      toast.error("Failed to fetch task");
    }
    setLoading(false);
  };

  const createTask = async (task: Partial<Task>) => {
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error("Failed to create task");
      const data = await response.json();

      setTasks([...tasks, data]);
      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
      toast.error("Failed to create task");
    }
    setLoading(false);
  };

  const updateTask = async (task: Task) => {
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/task/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error("Failed to update task");
      const data = await response.json();

      const newTasks = tasks.map((tsk) => {
        return task.id === data.id ? data : tsk;
      });

      setTasks(newTasks);
      toast.success("Task updated successfully");
    } catch (error) {
      console.log("Error updating task", error);
      toast.error("Failed to update task");
    }
    setLoading(false);
  };

  const deleteTask = async (taskId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/task/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("Error deleting task", error);
      toast.error("Failed to delete task");
    }
    setLoading(false);
  };

  const handleInput =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (name === "setTask") {
        setTask(e);
      } else {
        setTask({ ...task, [name]: e.target.value });
      }
    };

  // get completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  // get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    if (userId) {
      getTasks();
    }
  }, [userId]);

  const contextValue: TasksContextType = {
    tasks,
    loading,
    task,
    getTask,
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
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
