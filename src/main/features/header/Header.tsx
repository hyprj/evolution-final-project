import { Link } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { DropdownItem } from "../../components/Dropdown/DropdownItem";
import { useAuth } from "../auth/useAuth";
import { useSidebar } from "../sidebar/SidebarProvider";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "../../components/button/Button";

export function Header() {
  const { setIsOpen } = useSidebar();
  const { user, status, signOut } = useAuth();
  const balance = "100";

  return (
    <header className="sticky top-0 bg-[#25A18E] p-2 font-medium text-white">
      <ul
        className={`flex items-center justify-between px-5 ${
          status !== "loggedIn" ? "flex-row-reverse" : ""
        }`}
      >
        {user && (
          <li onClick={() => setIsOpen((prev) => !prev)}>
            <Button size="none">
              <Bars3Icon className="mt-2 h-6 w-6" />
            </Button>
          </li>
        )}
        {user && <li>{`balance: ${balance}$`}</li>}
        <Dropdown icon={<UserCircleIcon className="h-6 w-6" />} side="right">
          {user && (
            <>
              <DropdownItem>
                <Link to="profile">My account</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/" onClick={signOut}>
                  Sign out
                </Link>
              </DropdownItem>
            </>
          )}
          {!user && (
            <>
              <DropdownItem>
                <Link to="/login">Login</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/register">Register</Link>
              </DropdownItem>
            </>
          )}
        </Dropdown>
      </ul>
    </header>
  );
}
