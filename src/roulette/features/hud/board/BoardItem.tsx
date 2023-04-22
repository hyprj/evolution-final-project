interface Field {
  value: string | number;
  gridArea: string;
  bgColor?: "field-red" | "field-green" | "field-black" | "field-gray";
}

import { memo } from "react";
import { ChipAnimationPhase } from "@roulette/store/UIStore";
import { BetValue, ChipValue } from "@roulette/utils/types";
import { getFieldName, getGridAreaByValue, getBgColorByValue } from "./utils";
import { BoardChip } from "./BoardViewItem";

// chipsAmount are passed just for memoization.
// Full explanation why in `BoardView.tsx`

export const BoardItem = memo(
  ({
    isPortrait,
    value,
    chips,
    chipsAmount,
    animate,
  }: {
    isPortrait: boolean;
    value: BetValue;
    chips?: ChipValue[];
    chipsAmount?: number;
    animate: ChipAnimationPhase;
  }) => {
    // const name = getFieldName(value);
    const area = getGridAreaByValue(value, isPortrait);

    return (
      <div data-value={value} style={{ gridArea: area }}>
        {chips && <BoardChip chips={chips} animate={animate} />}
      </div>
    );
  }
);
