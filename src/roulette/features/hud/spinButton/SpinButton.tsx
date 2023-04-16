import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import "./spinButton.css";

export const SpinButton = observer(() => {
  const store = useStore();
  store.status;
  return (
    <button
      className={`spin-btn ${
        store.status !== "betting-phase" ? "spin-btn--disabled" : ""
      }`}
      onClick={() => store.spin()}
    >
      SPIN
    </button>
  );
});
