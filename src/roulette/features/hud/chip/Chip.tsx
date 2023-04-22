import { memo } from "react";
import { Chip } from "@roulette/utils/types";

import "./chip.css";

const chips: Record<Chip, string> = {
  1: "/chip-one.svg",
  5: "/chip-five.svg",
  10: "/chip-ten.svg",
  50: "/chip-fifty.svg",
  100: "/chip-hundred.svg",
};

export function ChipItem({
  chip,
  selected,
  handleClick,
}: {
  chip: Chip;
  selected: boolean;
  handleClick: (value: Chip) => void;
}) {
  return (
    <div
      className={`chip ${selected ? "chip--selected" : ""}`}
      onClick={() => handleClick(chip)}
    >
      <img src={chips[chip]} />
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
    icon: Chip;
  }) => {
    return (
      <div className={`chip-icon ${animate}`} data-value={icon}>
        {value}
      </div>
    );
  }
);
