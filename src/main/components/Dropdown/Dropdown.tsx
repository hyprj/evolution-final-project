import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  icon: React.ReactNode;
  side?: "left" | "right";
  children: React.ReactNode;
}

export function Dropdown({
  icon,
  side = "left",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className="relative mt-2"
      onClick={() => setIsOpen((prev) => !prev)}
      ref={divRef}
      {...props}
    >
      <button>{icon}</button>
      {isOpen && (
        <div
          className="absolute w-max  rounded-lg bg-white p-2 font-normal text-black shadow-md"
          style={{ right: side === "right" ? "0px" : "" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
