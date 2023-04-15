import { observer } from "mobx-react";
import { useStore } from "../../../store/StoreProvider";
import { ChipValue } from "../../../utils/types";
import { Chip } from "../chip/Chip";
import "./chipSelect.css";

export const ChipSelectHUD = observer(() => {
  const store = useStore();

  function handleClick(value: ChipValue) {
    if (store.selectedChip !== value) {
      store.setChip(value);
    }
  }

  return (
    <div className="chip-select">
      <Chip
        value={1}
        selected={store.selectedChip === 1}
        handleClick={handleClick}
      />
      <Chip
        value={5}
        selected={store.selectedChip === 5}
        handleClick={handleClick}
      />
      <Chip
        value={10}
        selected={store.selectedChip === 10}
        handleClick={handleClick}
      />
    </div>
  );
});
