import { Link } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { DropdownItem } from "../../components/Dropdown/DropdownItem";
import { useAuth } from "../auth/useAuth";

export function Header() {
  const { user, status, signOut } = useAuth();
  const balance = "100";

  return (
    <header className="sticky top-0 bg-[#25A18E] p-2 font-medium text-white">
      <ul
        className={`flex justify-between px-5 ${
          status !== "loggedIn" ? "flex-row-reverse" : ""
        }`}
      >
        {user && <li>{`balance: ${balance}$`}</li>}
        {status === "loggedIn" && (
          <Dropdown title="acc" side="right">
            <DropdownItem>
              <Link to="profile">My account</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/" onClick={signOut}>
                Sign out
              </Link>
            </DropdownItem>
          </Dropdown>
        )}
        {status !== "loggedIn" && (
          <Dropdown title="acc" side="right">
            <DropdownItem>
              <Link to="register">Sign in</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="login">Log in</Link>
            </DropdownItem>
          </Dropdown>
        )}
      </ul>
    </header>
  );
}
