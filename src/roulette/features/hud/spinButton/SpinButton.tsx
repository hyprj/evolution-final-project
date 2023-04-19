import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";

import "./spinButton.css";

export const SpinButton = observer(() => {
  const { runCameraAnimation } = useUIStore();
  const { phaseStore } = useRootStore();

  const isDisabledClass =
    phaseStore.phase !== "betting" ? "spin-btn--disabled" : "";

  return (
    <button
      className={`spin-btn ${isDisabledClass}`}
      onClick={() => {
        phaseStore.spin();
        runCameraAnimation();
      }}
    >
      SPIN
    </button>
  );
});
