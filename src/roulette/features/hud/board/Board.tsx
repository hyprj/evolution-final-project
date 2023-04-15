import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import { BoardView } from "./BoardView";
import { isBetValue, normalizeBetValue } from "../../../utils/utils";
import "./board.css";

export const Board = observer(() => {
  const store = useStore();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const domElementValue = (e.target as HTMLDivElement).dataset.value;
    if (domElementValue && isBetValue(domElementValue)) {
      const betValue = normalizeBetValue(domElementValue);
      store.placeBet(betValue);
    }
  }

  return (
    <div className="board__container">
      <div
        className="board"
        onClick={handleClick}
        // onMouseOver={store.handleMouseOver}
      >
        <BoardView />
      </div>
    </div>
  );
});
