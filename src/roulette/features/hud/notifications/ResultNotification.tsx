import { useRootStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";

function getMessage(prize: number, lastWinningNumber: number) {
  if (prize > 0) {
    return `You have won ${prize}$!`;
  }
  return `Number ${lastWinningNumber} is the winning number`;
}

export const ResultNotification = observer(() => {
  const { bettingStore } = useRootStore();
  const lastPrize = bettingStore.betHistoryStore.previousWonPrize;

  if (!lastPrize) {
    return null;
  }
  const message = getMessage(
    lastPrize,
    bettingStore.betHistoryStore.getRecentNumber()!
  );

  return (
    <div key={Math.random()} className="notification notification--result">
      {message}
    </div>
  );
});
