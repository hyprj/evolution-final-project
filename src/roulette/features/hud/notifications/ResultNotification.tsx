import { useRootStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";

function getMessage(prize: number) {
  if (prize > 0) {
    return `You have won ${prize}$!`;
  }
  return `You have lost ${Math.abs(prize)}$`;
}

export const ResultNotification = observer(() => {
  const { bettingStore } = useRootStore();
  const lastPrize = bettingStore.historyStore.previousWonPrizes.at(-1);

  if (!lastPrize) {
    return null;
  }
  const message = getMessage(lastPrize);

  return (
    <div key={Math.random()} className="notification notification--result">
      {message}
    </div>
  );
});
