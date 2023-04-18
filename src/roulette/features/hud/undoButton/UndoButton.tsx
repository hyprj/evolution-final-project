import { observer } from "mobx-react";
import { HUDElement } from "../balance/Balance";
import { useRootStore } from "../../../store/StoresProvider";

export const UndoButton = observer(() => {
  const { bettingStore } = useRootStore();
  return (
    <HUDElement>
      <button
        className={`${
          bettingStore.historyStore.currentValues.length > 0
            ? ""
            : "btn--disabled"
        }`}
        onClick={() => bettingStore.undo()}
      >
        undo
      </button>
    </HUDElement>
  );
});
