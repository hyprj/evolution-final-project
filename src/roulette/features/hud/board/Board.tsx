import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import { isBetValue, normalizeBetValue } from "@roulette/utils/utils";

import {
  HUD_VISIBLE_BET_VALUES,
  NOT_VISIBLE_FIELDS,
} from "@roulette/utils/consts";
import { BoardItem, BoardViewItem } from "./BoardViewItem";

import "./board.css";
import "./corner.css";
import "./street.css";
import "./line.css";

export const Board = observer(() => {
  const { bettingStore, phaseStore } = useRootStore();
  const { onBoardExit, onBoardHover, wheelStore, hoveredFields } = useUIStore();

  const boardStatusClass = wheelStore.getBoardAnimation();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const domElementValue = (e.target as HTMLDivElement).dataset.value;
    if (
      phaseStore.phase === "bets-open" &&
      domElementValue &&
      isBetValue(domElementValue)
    ) {
      const betValue = normalizeBetValue(domElementValue);
      bettingStore.place(betValue);
    }
  }

  return (
    <div className={`board__container`}>
      <div
        className={`board ${boardStatusClass}`}
        onClick={handleClick}
        onMouseLeave={onBoardExit}
        onMouseOver={onBoardHover}
      >
        {NOT_VISIBLE_FIELDS.map((field) => (
          <BoardItem
            key={field}
            value={field}
            total={bettingStore.bets.get(field)?.amount}
          />
        ))}
        {HUD_VISIBLE_BET_VALUES.map((field) => (
          <BoardViewItem
            key={field}
            value={field}
            total={bettingStore.bets.get(field)?.amount}
            isHovered={hoveredFields.includes(field)}
          />
        ))}
      </div>
    </div>
  );
});
