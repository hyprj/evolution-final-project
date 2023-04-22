import { observer } from "mobx-react";
import { HUDElement } from "../balance/Balance";
import { useRootStore } from "@roulette/store/StoresProvider";
import { NumericField } from "@roulette/utils/types";
import { RED_NUMBERS } from "@roulette/utils/consts";

import "./recentNumbers.css";

export const RecentNumbers = observer(() => {
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

function BoardFieldIcon({ value }: { value: NumericField }) {
  const color = RED_NUMBERS.includes(value as any)
    ? "field-icon--red"
    : "field-icon--black";
  return <div className={`field-icon ${color}`}>{value}</div>;
}
