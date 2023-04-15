import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import "./balance.css";

export const Balance = observer(() => {
  const { balance } = useStore();
  return (
    <div className="balance">
      <span className="balance__dolar">$</span> {balance}
    </div>
  );
});
