import { useRootStore } from "@roulette/store/StoresProvider";
import { HUDElement } from "../balance/Balance";
import { observer } from "mobx-react";

export const RepeatBetButton = observer(() => {
  const { bettingStore, phaseStore } = useRootStore();

  const isDisabled =
    !bettingStore.historyStore.hasPreviousBet() ||
    phaseStore.phase !== "bets-open";

  const isDisabledClass = isDisabled ? "btn--disabled" : "";

  return (
    <HUDElement>
      <button className={isDisabledClass} onClick={bettingStore.repeat}>
        repeat
      </button>
    </HUDElement>
  );
});
