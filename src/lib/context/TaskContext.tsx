import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../constants";

type Task = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
};

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  task: Partial<Task>;
  activeTasks: Task[];
  completedTasks: Task[];
  priority: string;
  isEditing: boolean;
  activeTask: Task | null;
  modalMode: string;
  profileModal: boolean;
  setPriority: (priority: string) => void;
  setIsEditing: (editing: boolean) => void;
  handleInput: (
    name: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  getTasks: () => Promise<void>;
  getTask: (taskId: string) => Promise<void>;
  openModalForAdd: () => void;
  openModalForEdit: (task: Task) => void;
  openProfileModal: () => void;
  closeModal: () => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error getting tasks", error);
    }
    setLoading(false);
  };

  const getTask = async (taskId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.error("Error getting task", error);
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

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    getTasks();
  }, []);

  const contextValue: TasksContextType = {
    tasks,
    loading,
    task,
    activeTasks,
    completedTasks,
    priority,
    isEditing,
    activeTask,
    modalMode,
    profileModal,
    setPriority,
    setIsEditing,
    handleInput,
    getTasks,
    getTask,
    openModalForAdd,
    openModalForEdit,
    openProfileModal,
    closeModal,
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
