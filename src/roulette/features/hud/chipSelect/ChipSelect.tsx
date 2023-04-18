import { observer } from "mobx-react";
import { useRootStore } from "@roulette/store/StoresProvider";
import { ChipValue } from "@roulette/utils/types";
import { Chip } from "../chip/Chip";

import "./chipSelect.css";

export const ChipSelectHUD = observer(() => {
  const { playerStore } = useRootStore();

  function handleClick(value: ChipValue) {
    if (playerStore.chip !== value) {
      playerStore.setChip(value);
    }
  }

  return (
    <div className="chip-select">
      <Chip
        value={1}
        selected={playerStore.chip === 1}
        handleClick={handleClick}
      />
      <Chip
        value={5}
        selected={playerStore.chip === 5}
        handleClick={handleClick}
      />
      <Chip
        value={10}
        selected={playerStore.chip === 10}
        handleClick={handleClick}
      />
    </div>
  );
});
