import { useRootStore } from "@roulette/store/StoresProvider";
import { HUDElement } from "../balance/Balance";
import { observer } from "mobx-react";

export const ResetBetButton = observer(() => {
  const { bettingStore, phaseStore } = useRootStore();

  const isDisabledClass =
    phaseStore.phase === "bets-closed" ? "btn--disabled" : "";

  return (
    <HUDElement>
      <button className={isDisabledClass} onClick={() => bettingStore.clear()}>
        reset
      </button>
    </HUDElement>
  );
});
