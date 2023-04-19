import { observer } from "mobx-react";
import { BoardView } from "./BoardView";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import { isBetValue, normalizeBetValue } from "@roulette/utils/utils";

import "./board.css";

export const Board = observer(() => {
  const { bettingStore } = useRootStore();
  const { onBoardExit, onBoardHover, getBoardAnimationStatus } = useUIStore();

  const boardStatusClass = getBoardAnimationStatus();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const domElementValue = (e.target as HTMLDivElement).dataset.value;
    if (domElementValue && isBetValue(domElementValue)) {
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
        <BoardView />
      </div>
    </div>
  );
});
