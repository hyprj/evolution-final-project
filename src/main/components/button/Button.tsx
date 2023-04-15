export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: keyof typeof colors;
  size?: keyof typeof sizes;
}

const colors = {
  transparent: "",
  red: "bg-red-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
};

const sizes = {
  none: "",
  sm: "p-4",
  lg: "px-8 py-2 rounded-xl font-semibold",
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
