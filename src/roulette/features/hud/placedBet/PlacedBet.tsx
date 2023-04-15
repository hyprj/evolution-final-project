import { observer } from "mobx-react";
import "./placedBet.css";
import { useStore } from "../../../store/StoreProvider";

export const PlacedBet = observer(() => {
  const { betsAmount } = useStore();
  return <div className="placed-bet">bet: {betsAmount}$</div>;
});
