import { useStore } from "../../../store/StoreProvider";
import { HUDElement } from "../balance/Balance";

export function LastBetButton() {
  const store = useStore();

  return (
    <HUDElement>
      <button onClick={() => store.repeatBet()}>repeat</button>
    </HUDElement>
  );
}
