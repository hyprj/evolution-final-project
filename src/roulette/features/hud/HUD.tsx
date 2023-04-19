import { Balance } from "./balance/Balance";
import { Board } from "./board/Board";
import { SpinButton } from "./spinButton/SpinButton";
import { ChipSelectHUD } from "./chipSelect/ChipSelect";
import { PlacedBet } from "./placedBet/PlacedBet";
import { UndoButton } from "./undoButton/UndoButton";
import { ResetBetButton } from "./resetBetButton/ResetBetButton";
import { RepeatBetButton } from "./repeatBetButton/RepeatBetButton";

import "./hud.css";
import { ResultsHistory } from "./resultsHistory/ResultsHistory";

export function HUD() {
  return (
    <div className="hud">
      <div className="hud__row">
        <Balance />
        <PlacedBet />
      </div>
      <div className="hud__center">
        <ChipSelectHUD />
        <div className="hud__board">
          <Board />
        </div>
      </div>
      <div className="hud__row hud__bottom">
        <ResultsHistory />
        <UndoButton />
        <RepeatBetButton />
        <ResetBetButton />
        <SpinButton />
      </div>
    </div>
  );
}
