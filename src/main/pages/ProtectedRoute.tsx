import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";

export function ProtectedRoute() {
  const { status } = useAuth();

  if (status === "visitor") {
    return <Navigate to="/" />;
  }

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-grow">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-52 flex-shrink-0 bg-zinc-100">
      <nav className="mx-1">
        <ul className="my-6  flex flex-col justify-center gap-4">
          <SidebarItem>
            <Link to="/app">My dashboard</Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/games">All games</Link>
          </SidebarItem>
        </ul>
      </nav>
    </aside>
  );
}

function SidebarItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="w-full rounded p-1 font-semibold hover:cursor-pointer hover:bg-zinc-200">
      {children}
    </li>
  );
}
