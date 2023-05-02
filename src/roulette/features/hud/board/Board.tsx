import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import { isField, normalizeField } from "@roulette/utils/utils";
import {
  HUD_VISIBLE_BET_VALUES,
  NOT_VISIBLE_FIELDS,
} from "@roulette/utils/consts";
import { BoardItem, BoardViewItem } from "./BoardViewItem";

import "./board.css";
import "./fieldsStyle/corner.css";
import "./fieldsStyle/line.css";
import "./fieldsStyle/splits.css";
import "./fieldsStyle/straightUp.css";
import "./fieldsStyle/street.css";

import { Dolly } from "../dolly/Dolly";

export const Board = observer(() => {
  const { bettingStore, phaseStore } = useRootStore();
  const {
    onBoardExit,
    onBoardHover,
    wheelStore,
    hoveredFields,
    notificationStore,
  } = useUIStore();

  const boardStatusClass = wheelStore.getBoardAnimation();

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
    <div className={`board__container`}>
      <div
        className={`board ${boardStatusClass}`}
        onClick={handleClick}
        onMouseLeave={onBoardExit}
        onMouseOver={onBoardHover}
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
            isHovered={hoveredFields.includes(field)}
          />
        ))}
      </div>
    </div>
  );
});
