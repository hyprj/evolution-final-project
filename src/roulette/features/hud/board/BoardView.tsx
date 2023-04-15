import { observer } from "mobx-react";
import { BET_VALUES } from "../../../utils/consts";
import { BoardViewItem } from "./BoardViewItem";
import { useStore } from "../../../store/StoreProvider";

/*
  The `chipsAmount` prop is passed to `BoardViewItem` to memoize the component.
  React performs a shallow comparison of prop values by default,
  and `prev.chips` is undefined in the comparison function.
*/

export const BoardView = observer(() => {
  const store = useStore();
  return (
    <>
      {BET_VALUES.map((value) => (
        <BoardViewItem
          key={value}
          value={value}
          chips={store.bets.get(value)?.chips}
          chipsAmount={store.bets.get(value)?.chips.length}
          animate={store.getAnimationStatusForField(value)}
        />
      ))}
    </>
  );
});
