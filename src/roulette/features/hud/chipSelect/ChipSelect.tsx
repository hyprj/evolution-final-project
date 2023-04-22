import { useRootStore } from "@roulette/store/StoresProvider";
import { CHIPS } from "@roulette/utils/consts";
import { Chip } from "@roulette/utils/types";
import { observer } from "mobx-react";
import { ChipItem } from "../chip/Chip";

import "./chipSelect.css";

export const ChipSelectHUD = observer(() => {
  const { playerStore } = useRootStore();

  function handleClick(chip: Chip) {
    if (playerStore.chip !== chip) {
      playerStore.setChip(chip);
    }
  }

  return (
    <div className="chip-select">
      {CHIPS.map((chip) => (
        <ChipItem
          chip={chip}
          selected={playerStore.chip === chip}
          handleClick={handleClick}
          key={chip}
        />
      ))}
    </div>
  );
});
