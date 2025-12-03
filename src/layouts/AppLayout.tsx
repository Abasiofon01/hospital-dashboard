import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface AppLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const AppLayout = ({ children, pageTitle }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen relative flex bg-gray-50 dark:bg-[#111111]">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[302px]">
        <Header pageTitle={pageTitle} onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-auto pb-10">
          <div className="max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
