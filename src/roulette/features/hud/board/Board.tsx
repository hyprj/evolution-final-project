import { observer } from "mobx-react";
import { BoardView } from "./BoardView";
import { isBetValue, normalizeBetValue } from "../../../utils/utils";
import { useRootStore, useUIStore } from "../../../store/StoresProvider";

import "./board.css";

export const Board = observer(() => {
  const { bettingStore } = useRootStore();
  const uiStore = useUIStore();

  const boardStatusClass =
    bettingStore.status === "spinning-phase" ? "board--active" : "";

  if (bettingStore.status === "spinning-phase") {
    console.log("scream");
  }

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
        onMouseOver={(e) => uiStore.handleBoardHover(e)}
      >
        <BoardView />
      </div>
    </div>
  );
});
