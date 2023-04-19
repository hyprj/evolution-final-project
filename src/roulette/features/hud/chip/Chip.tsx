import { memo } from "react";
import { ChipValue } from "@roulette/utils/types";

import "./chip.css";

const chips: Record<ChipValue, string> = {
  1: "/chip-one.svg",
  5: "/chip-five.svg",
  10: "/chip-ten.svg",
  50: "/chip-fifty.svg",
  100: "/chip-hundred.svg",
};

export function Chip({
  value,
  selected,
  handleClick,
}: {
  value: ChipValue;
  selected: boolean;
  handleClick: (value: ChipValue) => void;
}) {
  return (
    <div
      className={`chip ${selected ? "chip--selected" : ""}`}
      onClick={() => handleClick(value)}
    >
      <img src={chips[value]} />
    </div>
  );
}

export const ChipIcon = memo(
  ({
    value,
    animate,
    icon,
  }: {
    value: number | string;
    animate: string;
    icon: ChipValue;
  }) => {
    return (
      <div className={`chip-icon ${animate}`} data-value={icon}>
        {value}
      </div>
    );
  }
);
