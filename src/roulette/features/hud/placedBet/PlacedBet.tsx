import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import { HUDElement } from "../balance/Balance";
import "./placedBet.css";

export const PlacedBet = observer(() => {
  const { betsAmount } = useStore();
  return (
    <HUDElement>
      <span className="yellow uppercase">total bet</span>: {betsAmount}
      <span className="lightgreen">$</span>
    </HUDElement>
  );
});
