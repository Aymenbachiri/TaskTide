import { ModalSection } from "./ModalSection";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ borderRadius: 30 }}
      className="main-layout h-full w-full overflow-auto border-2 border-white bg-[#EDEDED] p-4 dark:bg-[#1a1a1a] dark:text-white md:w-[60%] lg:w-[85%]"
    >
      <ModalSection />
      {children}
    </div>
  );
}
