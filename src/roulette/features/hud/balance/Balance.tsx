import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import "./balance.css";

export const Balance = observer(() => {
  const { balance } = useStore();
  return (
    // <div className="balance">
    <HUDElement>
      <span className="balance__dolar">$</span> {balance}
      {/* // </div> */}
    </HUDElement>
  );
});

export function HUDElement({ children }: { children: React.ReactNode }) {
  return <div className="hud__element">{children}</div>;
}
