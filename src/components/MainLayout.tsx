import { ModalSection } from "./ModalSection";
import { ProfileSection } from "./ProfileSection";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ borderRadius: 30 }}
      className="main-layout w-[60%] flex-1 overflow-auto border-2 border-white bg-[#EDEDED] dark:bg-[#1a1a1a] dark:text-white"
    >
      <ModalSection />
      <ProfileSection />
      {children}
    </div>
  );
}
