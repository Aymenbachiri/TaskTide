"use client";

import { useTasks } from "@/lib/context/TaskContext";
import { Modal } from "./Modal";

export function ModalSection() {
  const { isEditing } = useTasks();
  return <>{isEditing && <Modal />}</>;
}
