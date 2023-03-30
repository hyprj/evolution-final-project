import { Outlet } from "react-router-dom";
import { Header } from "../features/header/Header";

export function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
