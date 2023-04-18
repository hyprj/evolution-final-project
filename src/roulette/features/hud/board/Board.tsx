import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import { BoardView } from "./BoardView";
import { isBetValue, normalizeBetValue } from "../../../utils/utils";
import "./board.css";

export const Board = observer(() => {
  const store = useStore();

  const boardStatusClass =
    store.status === "spinning-phase" ? "board--active" : "";

  if (store.status === "spinning-phase") {
    console.log("scream");
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const domElementValue = (e.target as HTMLDivElement).dataset.value;
    if (domElementValue && isBetValue(domElementValue)) {
      const betValue = normalizeBetValue(domElementValue);
      store.placeBet(betValue);
    }
  }

  return (
    <div className={`board__container`}>
      <div
        className={`board ${boardStatusClass}`}
        onClick={handleClick}
        onMouseOver={(e) => store.handleBoardHover(e)}
      >
        <BoardView />
      </div>
    </div>
  );
});
