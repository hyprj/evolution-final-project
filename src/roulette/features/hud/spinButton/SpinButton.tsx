import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";

import "./spinButton.css";

export const SpinButton = observer(() => {
  const { runCameraAnimation } = useUIStore();
  const { phaseStore } = useRootStore();
  return (
    <button
      className={`spin-btn ${
        phaseStore.phase !== "betting" ? "spin-btn--disabled" : ""
      }`}
      onClick={() => {
        phaseStore.spin();
        runCameraAnimation();
      }}
    >
      SPIN
    </button>
  );
});
