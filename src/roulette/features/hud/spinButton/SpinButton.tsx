import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";

import "./spinButton.css";

export const SpinButton = observer(() => {
  const { phaseStore, gameStore } = useRootStore();
  const { wheelStore } = useUIStore();

  const isDisabledClass =
    phaseStore.phase !== "bets-open" ? "spin-btn--disabled" : "";

  return (
    <button
      className={`spin-btn ${isDisabledClass}`}
      onClick={() => gameStore.spin(wheelStore)}
    >
      SPIN
    </button>
  );
});
