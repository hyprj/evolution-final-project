import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarProvider";

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <aside
      className={`${
        isOpen ? "left-0" : "-left-44"
      } duration-200ms absolute top-0 z-40 h-full w-44  flex-shrink-0 overflow-hidden bg-zinc-100 pt-12 transition-[left] ease-in-out  mobile-landscape:mt-0 `}
    >
      <nav className={`mx-1 ${isOpen ? "" : "hidden"}`}>
        <ul className="my-6  flex flex-col justify-center gap-4">
          <Link to="/app" onClick={() => setIsOpen(false)}>
            <SidebarItem>My dashboard</SidebarItem>
          </Link>
          <Link to="/app/games" onClick={() => setIsOpen(false)}>
            <SidebarItem>All games</SidebarItem>
          </Link>
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
