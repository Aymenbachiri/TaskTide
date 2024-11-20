import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import { MiniSidebar } from "@/components/MiniSidebar";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/MainLayout";
import SidebarProvider from "@/components/SidebarProvider";
import { TasksProvider } from "../context/TaskContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TasksProvider>
        <NextTopLoader />
        <Toaster expand={true} richColors position="top-center" />
        <div className="flex h-full md:overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:flex">
            <MiniSidebar />
          </div>
          <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex h-full flex-col md:flex-row">
              <div className="w-full px-4 md:w-[83%] md:pb-6 md:pr-[20rem]">
                <MainLayout>{children}</MainLayout>
              </div>
              <div className="hidden md:flex">
                <SidebarProvider />
              </div>
            </div>
          </div>
        </div>
      </TasksProvider>
    </ThemeProvider>
  );
}
