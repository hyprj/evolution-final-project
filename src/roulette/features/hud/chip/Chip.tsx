import { memo, useState } from "react";
import { ChipAnimationPhase } from "@roulette/store/UIStore";
import { ChipValue } from "@roulette/utils/types";

import "./chip.css";

const chips: Record<ChipValue, string> = {
  1: "/chip-one.svg",
  5: "/chip-five.svg",
  10: "/chip-ten.svg",
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
  ({ value, animate }: { value: ChipValue; animate: ChipAnimationPhase }) => {
    const [randomXOffset] = useState(Math.floor(Math.random() * 30 - 15));
    const [randomYOffset] = useState(Math.floor(Math.random() * 30 - 15));
    return (
      <img
        className={`chip-icon ${animate}`}
        style={{
          marginTop: randomYOffset + "px",
          marginLeft: randomXOffset + "px",
        }}
        src={chips[value]}
      />
    );
  }
);
