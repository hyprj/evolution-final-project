import { useUIStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";

export const ResultTimer = observer(() => {
  const { secondsToResult } = useUIStore();

  if (!secondsToResult) {
    return null;
  }

  return (
    <div key={Math.random()} className="notification ">
      {secondsToResult}
    </div>
  );
});
