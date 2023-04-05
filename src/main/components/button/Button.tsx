export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: keyof typeof colors;
  size?: keyof typeof sizes;
}

const colors = {
  transparent: "",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
};

const sizes = {
  sm: "p-4",
  lg: "px-8 py-2 rounded-xl",
};

export function Button({
  bgColor = "transparent",
  size = "sm",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${colors[bgColor]} ${sizes[size]}`} {...rest}>
      {children}
    </button>
  );
}
