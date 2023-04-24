import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";

import "./spinButton.css";
import { useScene } from "react-babylonjs";

export const SpinButton = observer(() => {
  const { bettingStore, phaseStore, resultStore } = useRootStore();
  const { wheelStore } = useUIStore();
  const scene = useScene();

  const isDisabledClass =
    phaseStore.phase !== "bets-open" ? "spin-btn--disabled" : "";

  return (
    <button
      className={`spin-btn ${isDisabledClass}`}
      onClick={() => {
        wheelStore.spin(bettingStore, phaseStore, resultStore);
        // scene?.getAnimationGroupByName("Animation")?.play();
        console.log(scene?.getAnimationGroupByName("Animation"));
      }}
    >
      SPIN
    </button>
  );
});
