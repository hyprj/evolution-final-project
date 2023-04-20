import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import { BET_VALUES } from "@roulette/utils/consts";
import { observer } from "mobx-react";
import { BoardViewItem } from "./BoardViewItem";
import { useOrientation } from "@roulette/utils/useOrientation";

/*
  The `chipsAmount` prop is passed to `BoardViewItem` to memoize the component.
  React performs a shallow comparison of prop values by default,
  and `prev.chips` is undefined in the comparison function.

  orientation is passed to recalcute the area on change
*/

export const BoardView = observer(() => {
  const { bettingStore } = useRootStore();
  const uiStore = useUIStore();
  const { isPortrait } = useOrientation();
  return (
    <>
      {BET_VALUES.map((value) => (
        <BoardViewItem
          isPortrait={isPortrait}
          key={value}
          value={value}
          chips={bettingStore.bets.get(value)?.chips}
          isHovered={uiStore.hoveredFields.includes(value)}
          chipsAmount={bettingStore.bets.get(value)?.chips.length}
          animate={uiStore.getAnimationStatusForField(value)}
        />
      ))}
    </>
  );
});
