import { createContext, useContext, useState } from "react";
import type { Task } from "../types/types";

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  task: Partial<Task>;
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
  openModalForAdd: () => void;
  openModalForEdit: (task: Task) => void;
  openProfileModal: () => void;
  closeModal: () => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const handleInput =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (name === "setTask") {
        setTask(e);
      } else {
        setTask({ ...task, [name]: e.target.value });
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
    tasks: [],
    loading: false,
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
