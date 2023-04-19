import { useRootStore } from "@roulette/store/StoresProvider";
import { CHIP_VALUES } from "@roulette/utils/consts";
import { ChipValue } from "@roulette/utils/types";
import { observer } from "mobx-react";
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
      {CHIP_VALUES.map((value) => (
        <Chip
          value={value}
          selected={playerStore.chip === value}
          handleClick={handleClick}
          key={value}
        />
      ))}
    </div>
  );
});
