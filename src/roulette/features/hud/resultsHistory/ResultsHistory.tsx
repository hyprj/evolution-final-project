import { observer } from "mobx-react";
import { HUDElement } from "../balance/Balance";
import { useRootStore } from "@roulette/store/StoresProvider";
import { NumericBetValue } from "@roulette/utils/types";
import { RED_NUMBERS } from "@roulette/utils/consts";

import "./resultsHistory.css";

export const ResultsHistory = observer(() => {
  const { bettingStore } = useRootStore();
  const results = bettingStore.historyStore.lastWinningNumbers;
  return (
    <HUDElement stretch justifyEnd>
      {results.map((result, i) => (
        <BoardFieldIcon key={`${i}${result}`} value={result} />
      ))}
    </HUDElement>
  );
});

function BoardFieldIcon({ value }: { value: NumericBetValue }) {
  const color = RED_NUMBERS.includes(value as any)
    ? "field-icon--red"
    : "field-icon--black";
  return <div className={`field-icon ${color}`}>{value}</div>;
}
