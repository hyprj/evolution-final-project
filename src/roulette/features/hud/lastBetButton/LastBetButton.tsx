import { useRootStore } from "../../../store/StoresProvider";
import { HUDElement } from "../balance/Balance";

export function LastBetButton() {
  const { bettingStore } = useRootStore();

  return (
    <HUDElement>
      <button onClick={() => bettingStore.repeat()}>repeat</button>
    </HUDElement>
  );
}
