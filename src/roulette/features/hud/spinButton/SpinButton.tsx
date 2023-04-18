import { observer } from "mobx-react";
import { useRootStore } from "@roulette/store/StoresProvider";

import "./spinButton.css";

export const SpinButton = observer(() => {
  const { bettingStore } = useRootStore();
  return (
    <button
      className={`spin-btn ${
        bettingStore.status !== "betting-phase" ? "spin-btn--disabled" : ""
      }`}
      onClick={() => bettingStore.spin()}
    >
      SPIN
    </button>
  );
});
