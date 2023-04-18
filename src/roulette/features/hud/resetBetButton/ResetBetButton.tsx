import { useStore } from "../../../store/StoreProvider";
import { HUDElement } from "../balance/Balance";

export function ResetBetButton() {
  const store = useStore();

  return (
    <HUDElement>
      <button onClick={() => store.resetBet()}>reset</button>
    </HUDElement>
  );
}
