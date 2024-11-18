"use client";

import { useTasks } from "@/lib/context/TaskContext";
import { ProfileModal } from "./ProfileModal";

export function ProfileSection() {
  const { profileModal } = useTasks();
  return <>{profileModal && <ProfileModal />}</>;
}
