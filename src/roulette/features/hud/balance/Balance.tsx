import { observer } from "mobx-react";
import { useRootStore } from "../../../store/StoresProvider";

import "./balance.css";

export const Balance = observer(() => {
  const { playerStore } = useRootStore();
  return (
    <HUDElement>
      <span className="balance__dolar">$</span> {playerStore.balance}
    </HUDElement>
  );
});

export function HUDElement({ children }: { children: React.ReactNode }) {
  return <div className="hud__element">{children}</div>;
}
