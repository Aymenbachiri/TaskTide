export function MainLayout({ children }: { children: React.ReactNode }) {
  // const { isEditing, profileModal } = useTasks();

  return (
    <div
      style={{ borderRadius: 30 }}
      className="main-layout w-[60%] flex-1 overflow-auto border-2 border-white bg-[#EDEDED] dark:bg-[#1a1a1a] dark:text-white"
    >
      {/* {isEditing && <Modal />}
        {profileModal && <ProfileModal />} */}
      {children}
    </div>
  );
}
