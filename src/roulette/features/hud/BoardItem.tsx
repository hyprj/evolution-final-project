interface TableItemProps {
  text: string | number;
  bgColor?: "black" | "red" | "none";
  bgRounded?: "full" | "none";
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  rotate?: boolean;
}

const tableItemPropsValues = {
  bgColor: {
    none: "",
    black: "bg-black",
    red: "bg-red-500",
  },
  bgRounded: {
    none: "",
    full: "rounded-full",
  },
};

export const BoardItem = ({
  text,
  bgColor = "none",
  bgRounded = "none",
  colEnd,
  colStart,
  rowEnd,
  rowStart,
  rotate = false,
}: TableItemProps) => {
  const bgColorClass = tableItemPropsValues.bgColor[bgColor];
  const roundedClass = tableItemPropsValues.bgRounded[bgRounded];
  const positionClass = `col-start-${colStart} col-end-${colEnd} row-start-${rowStart} row-end-${rowEnd}`;

  return (
    <div
      className={`flex items-center justify-center ${bgColorClass} ${roundedClass} ${positionClass} ${
        rotate ? "-rotate-90" : ""
      }`}
    >
      {text}
    </div>
  );
};
