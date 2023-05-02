import { memo } from "react";
import { Chip, Field } from "@roulette/utils/types";
import { getBgColorByField, getFieldName } from "./utils";
import { ChipIcon } from "../chip/Chip";
import { observer } from "mobx-react";
import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";

export const BoardViewItem = memo(
  ({
    value,
    isHovered,
    total,
  }: {
    value: Field;
    isHovered: boolean;
    total?: number;
  }) => {
    const name = getFieldName(value);
    const bgColor = getBgColorByField(value);
    const hoverClass = isHovered ? "hover" : "";

    return (
      <div
        className={`${bgColor} ${hoverClass} board__field board__field--border`}
        data-value={value}
      >
        {name}
        {total && <BoardChip total={total} value={value} />}
      </div>
    );
  }
);

export const BoardChip = observer(
  ({ total, value }: { total: number; value: Field }) => {
    const { resultStore } = useRootStore();
    const { wheelStore } = useUIStore();

    const icon = getChipIconByBetValue(total);
    const betValue = blahblah(total);
    const animate = wheelStore.getChipResultAnimation(
      resultStore.result,
      value
    );
    return <ChipIcon value={betValue} icon={icon} animate={animate} />;
  }
);

export function blahblah(value: number) {
  if (value < 1000) return value;
  return (value / 100 / 10).toFixed(2) + "k";
}

export function getChipIconByBetValue(betValue: number): Chip {
  if (betValue >= 100) {
    return 100;
  }
  if (betValue >= 50) {
    return 50;
  }
  if (betValue >= 10) {
    return 10;
  } else if (betValue >= 5) {
    return 5;
  }
  return 1;
}

export const BoardItem = memo(
  ({ value, total }: { value: Field; total?: number }) => {
    return (
      <div className="board__field" data-value={value} style={{ zIndex: 10 }}>
        {total && <BoardChip total={total} value={value} />}
      </div>
    );
  }
);
