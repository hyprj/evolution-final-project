export function DropdownItem({ children }: { children: React.ReactNode }) {
  return (
    <li className=" rounded-md px-2 py-1 hover:cursor-pointer hover:bg-gray-300">
      {children}
    </li>
  );
}
