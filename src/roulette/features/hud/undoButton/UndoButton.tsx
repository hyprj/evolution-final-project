import { observer } from "mobx-react";
import { HUDElement } from "../balance/Balance";
import { useRootStore } from "@roulette/store/StoresProvider";

export const UndoButton = observer(() => {
  const { bettingStore, phaseStore } = useRootStore();

  const isDisabledClass =
    phaseStore.phase === "bets-closed" ? "btn--disabled" : "";

  return (
    <HUDElement>
      <button className={isDisabledClass} onClick={bettingStore.undo}>
        undo
      </button>
    </HUDElement>
  );
});
