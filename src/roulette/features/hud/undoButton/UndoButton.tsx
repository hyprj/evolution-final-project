import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import { HUDElement } from "../balance/Balance";

export const UndoButton = observer(() => {
  const store = useStore();
  return (
    <HUDElement>
      <button
        className={`${
          store.currentBetHistory.length > 0 ? "" : "btn--disabled"
        }`}
        onClick={() => store.undoBet()}
      >
        undo
      </button>
    </HUDElement>
  );
});
