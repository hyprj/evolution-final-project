import { useRootStore } from "../../../store/StoresProvider";
import { HUDElement } from "../balance/Balance";

export function ResetBetButton() {
  const { bettingStore } = useRootStore();

  return (
    <HUDElement>
      <button onClick={() => bettingStore.clear()}>reset</button>
    </HUDElement>
  );
}
