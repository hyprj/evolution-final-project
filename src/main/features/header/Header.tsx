import { Link } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { DropdownItem } from "../../components/Dropdown/DropdownItem";

export function Header() {
  const userStatus = "loggedIn";
  const balance = "100";

  return (
    <header className="sticky top-0 bg-[#25A18E] p-2 font-medium text-white">
      <ul className="flex justify-between px-5">
        <li>{`balance: ${balance}$`}</li>
        {userStatus === "loggedIn" && (
          <Dropdown title="acc" side="right">
            <DropdownItem>
              <Link to="profile">My account</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/">Sign out</Link>
            </DropdownItem>
          </Dropdown>
        )}
        {userStatus !== "loggedIn" && (
          <Dropdown title="acc">
            <Link to="register">Sign in</Link>
            <Link to="login">Log in</Link>
          </Dropdown>
        )}
      </ul>
    </header>
  );
}
