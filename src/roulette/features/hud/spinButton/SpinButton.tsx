import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import "./spinButton.css";

export const SpinButton = observer(() => {
  const store = useStore();
  return (
    <button className="spin-btn" onClick={() => store.spin()}>
      SPIN
    </button>
  );
});
