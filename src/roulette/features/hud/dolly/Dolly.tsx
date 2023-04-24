import { useRootStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";

import "./dolly.css";

export const Dolly = observer(() => {
  const { resultStore } = useRootStore();

  if (typeof resultStore.result !== "number") {
    return null;
  }

  return <div className="dolly" data-value={resultStore.result}></div>;
});
