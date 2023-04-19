import { observer } from "mobx-react";
import { useRootStore } from "@roulette/store/StoresProvider";

import "./spinButton.css";

export const SpinButton = observer(() => {
  const { phaseStore, bettingStore } = useRootStore();
  return (
    <button
      className={`spin-btn ${
        phaseStore.phase !== "betting" ? "spin-btn--disabled" : ""
      }`}
      onClick={() => bettingStore.spin()}
    >
      SPIN
    </button>
  );
});
