import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "./AuthProvider";
import { MiniSidebar } from "@/components/MiniSidebar";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/MainLayout";
import { SidebarProvider } from "@/components/SidebarProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NextTopLoader />
        <Toaster expand={true} richColors position="top-left" />
        <div className="flex h-full overflow-hidden">
          <MiniSidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <div
              style={{ width: "83%" }}
              className="flex h-full pb-[1.5rem] pr-[20rem]"
            >
              <MainLayout>{children}</MainLayout>
              <SidebarProvider />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
