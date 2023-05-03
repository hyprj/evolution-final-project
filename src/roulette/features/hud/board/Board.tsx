import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import { isField, normalizeField } from "@roulette/utils/utils";
import { BoardItem, BoardViewItem } from "./BoardViewItem";
import {
  HUD_VISIBLE_BET_VALUES,
  NOT_VISIBLE_FIELDS,
} from "@roulette/utils/consts";

import "./board.css";
import "./fieldsStyle/corner.css";
import "./fieldsStyle/line.css";
import "./fieldsStyle/splits.css";
import "./fieldsStyle/straightUp.css";
import "./fieldsStyle/street.css";

import { Dolly } from "../dolly/Dolly";

export const Board = observer(() => {
  const { bettingStore, phaseStore } = useRootStore();
  const { boardStore, notificationStore } = useUIStore();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const domElementValue = (e.target as HTMLDivElement).dataset.value;
    if (
      phaseStore.phase === "bets-open" &&
      domElementValue &&
      isField(domElementValue)
    ) {
      const betValue = normalizeField(domElementValue);
      if (!bettingStore.place(betValue)) {
        notificationStore.addNotification("Bet too high");
      }
    }
  }

  return (
    <div className="board__container">
      <div
        className={`board ${
          boardStore.boardPhase === "betting" ? "" : "board--tilted"
        }`}
        onClick={handleClick}
        onMouseLeave={boardStore.onBoardExit}
        onMouseOver={boardStore.onBoardHover}
      >
        <Dolly />
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
            isHovered={boardStore.hoveredFields.includes(field)}
          />
        ))}
      </div>
    </div>
  );
});
