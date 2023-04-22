import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import {
  HUD_VISIBLE_BET_VALUES,
  NOT_VISIBLE_BET_VALUES,
} from "@roulette/utils/consts";
import { observer } from "mobx-react";
import { BoardItem, BoardViewItem } from "./BoardViewItem";

export const BoardView = observer(() => {
  const { bettingStore } = useRootStore();
  const uiStore = useUIStore();

  return (
    <>
      {NOT_VISIBLE_BET_VALUES.map((value) => (
        <BoardItem
          key={value}
          value={value}
          total={bettingStore.bets.get(value)?.total}
        />
      ))}
      {HUD_VISIBLE_BET_VALUES.map((value) => (
        <BoardViewItem
          key={value}
          value={value}
          total={bettingStore.bets.get(value)?.total}
          isHovered={uiStore.hoveredFields.includes(value)}
        />
      ))}
    </>
  );
});
