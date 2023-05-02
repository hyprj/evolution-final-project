import { observer } from "mobx-react";
import { HUDElement } from "../balance/Balance";
import { useRootStore } from "@roulette/store/StoresProvider";

import "./placedBet.css";

export const PlacedBet = observer(() => {
  const { bettingStore } = useRootStore();
  return (
    <HUDElement>
      <span className="yellow uppercase">total bet</span>:{" "}
      {bettingStore.totalBetValue}
      <span className="lightgreen">$</span>
    </HUDElement>
  );
});
