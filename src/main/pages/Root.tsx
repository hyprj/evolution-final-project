import { Outlet } from "react-router-dom";
import Header from "../features/header/Header";
import { SidebarProvider } from "../features/sidebar/SidebarProvider";
import { Sidebar } from "../features/sidebar/Sidebar";

export function Root() {
  return (
    <SidebarProvider>
      <Header />
      <div className="flex flex-shrink-0 flex-grow">
        <Sidebar />
        <main className="relative flex flex-grow">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
