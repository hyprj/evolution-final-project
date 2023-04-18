import { memo } from "react";
import { ChipAnimationPhase } from "@roulette/store/UIStore";
import { BetValue, ChipValue } from "@roulette/utils/types";
import { getFieldName, getGridAreaByValue, getBgColorByValue } from "./utils";
import { ChipIcon } from "../chip/Chip";

// chipsAmount are passed just for memoization.
// Full explanation why in `BoardView.tsx`

export const BoardViewItem = memo(
  ({
    value,
    isHovered,
    chips,
    chipsAmount,
    animate,
  }: {
    value: BetValue;
    isHovered: boolean;
    chips?: ChipValue[];
    chipsAmount?: number;
    animate: ChipAnimationPhase;
  }) => {
    const name = getFieldName(value);
    const area = getGridAreaByValue(value);
    const bgColor = getBgColorByValue(value);
    const hoverClass = isHovered ? "hover" : "";
    return (
      <div
        className={`${bgColor} ${hoverClass} board__field`}
        data-value={value}
        style={{ gridArea: area }}
      >
        {name}
        {chips && <BoardChip chips={chips} />}
      </div>
    );
  }
);

export function BoardChip({ chips }: { chips: ChipValue[] }) {
  const totalChipsValue = chips.reduce((acc, curr) => (acc += curr), 0);
  const icon = getChipIconByBetValue(totalChipsValue);
  const betValue = blahblah(totalChipsValue);
  return <ChipIcon value={betValue} icon={icon} />;
}

export function blahblah(value: number) {
  if (value < 1000) return value;
  return (value / 100 / 10).toFixed(2) + "k";
}

export function getChipIconByBetValue(betValue: number): ChipValue {
  if (betValue >= 10) {
    return 10;
  } else if (betValue >= 5) {
    return 5;
  }
  return 1;
}
