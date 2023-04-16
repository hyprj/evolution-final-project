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
      <div className="hud__center">
        {/* <div className="hud__center--narrow"> */}
        <ChipSelectHUD />
        {/* </div> */}
        <div className="hud__board">
          <Board />
        </div>
        {/* <div className="hud__center--narrow">xd</div> */}
      </div>
      <div className="hud__row hud__bottom">
        <SpinButton />
      </div>
    </div>
  );
}
