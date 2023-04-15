import { Balance } from "./balance/Balance";
import { Board } from "./board/Board";
import { SpinButton } from "./spinButton/SpinButton";
import { ChipSelectHUD } from "./chipSelect/ChipSelect";
import { PlacedBet } from "./placedBet/PlacedBet";
import "./hud.css";

export function HUD() {
  return (
    <div className="hud">
      <div className="hud__row">
        <Balance />
        <PlacedBet />
      </div>
      <Board />
      <div className="hud__row">
        <ChipSelectHUD />
        <SpinButton />
      </div>
    </div>
  );
}
