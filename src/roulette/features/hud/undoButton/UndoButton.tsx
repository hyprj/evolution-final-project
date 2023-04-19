import { observer } from "mobx-react";
import { HUDElement } from "../balance/Balance";
import { useRootStore } from "@roulette/store/StoresProvider";

export const UndoButton = observer(() => {
  const { bettingStore, phaseStore } = useRootStore();

  const isDisabled =
    bettingStore.historyStore.currentValues.length === 0 ||
    phaseStore.phase !== "betting";

  const isDisabledClass = isDisabled ? "btn--disabled" : "";

  return (
    <HUDElement>
      <button className={isDisabledClass} onClick={bettingStore.undo}>
        undo
      </button>
    </HUDElement>
  );
});
