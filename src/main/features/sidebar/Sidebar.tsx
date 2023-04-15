import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarProvider";

export function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={`${
        isOpen ? "basis-52" : " basis-0"
      } duration-200ms  flex-shrink-0 bg-zinc-100 transition-[flex-basis]`}
    >
      <nav className={`mx-1 ${isOpen ? "" : "hidden"}`}>
        <ul className="my-6  flex flex-col justify-center gap-4">
          <SidebarItem>
            <Link to="/app">My dashboard</Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/app/games">All games</Link>
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
