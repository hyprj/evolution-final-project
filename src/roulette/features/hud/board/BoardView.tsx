import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import { BET_VALUES } from "@roulette/utils/consts";
import { observer } from "mobx-react";
import { BoardViewItem } from "./BoardViewItem";

/*
  The `chipsAmount` prop is passed to `BoardViewItem` to memoize the component.
  React performs a shallow comparison of prop values by default,
  and `prev.chips` is undefined in the comparison function.
*/

export const BoardView = observer(() => {
  const { bettingStore } = useRootStore();
  const uiStore = useUIStore();
  return (
    <>
      {BET_VALUES.map((value) => (
        <BoardViewItem
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
