import { memo } from "react";
import { BetValue, ChipValue } from "../../../utils/types";
import { getGridAreaByValue, getBgColorByValue, getFieldName } from "./utils";
import { ChipIcon } from "../chip/Chip";
import { ChipAnimationPhase } from "../../../store/store";

// chipsAmount are passed just for memoization.
// Full explanation why in `BoardView.tsx`

export const BoardViewItem = memo(
  ({
    value,
    hover,
    chips,
    chipsAmount,
    animate,
  }: {
    value: BetValue;
    hover: boolean;
    chips?: ChipValue[];
    chipsAmount?: number;
    animate: ChipAnimationPhase;
  }) => {
    const name = getFieldName(value);
    const area = getGridAreaByValue(value);
    const bgColor = getBgColorByValue(value);
    const hoverClass = hover ? "hover" : "";
    return (
      <div
        className={`${bgColor} ${hoverClass} board__field`}
        data-value={value}
        style={{ gridArea: area }}
      >
        {name}
        {chips &&
          chips.map((chipValue, i) => (
            <ChipIcon key={i} value={chipValue} animate={animate} />
          ))}
      </div>
    );
  }
);
