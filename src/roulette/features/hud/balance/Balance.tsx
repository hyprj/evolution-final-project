import { observer } from "mobx-react";
import { useRootStore } from "@roulette/store/StoresProvider";

import "./balance.css";

export const Balance = observer(() => {
  const { playerStore } = useRootStore();
  return (
    <HUDElement>
      <span className="balance__dolar">$</span> {playerStore.balance}
    </HUDElement>
  );
});

export function HUDElement({
  children,
  stretch = false,
  justifyEnd = false,
}: {
  children: React.ReactNode;
  stretch?: boolean;
  justifyEnd?: boolean;
}) {
  const stretchClass = stretch ? "hud__element--stretch" : "";
  const jusitfyEndClass = justifyEnd ? "hud__element--justify-end" : "";
  return (
    <div className={`hud__element ${stretchClass} ${jusitfyEndClass}`}>
      {children}
    </div>
  );
}
