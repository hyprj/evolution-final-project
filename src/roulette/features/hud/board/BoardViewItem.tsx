import { memo } from "react";
import { Field } from "@roulette/utils/types";
import {
  chipValueToString,
  getBgColorByField,
  getChipIconByBetValue,
  getFieldName,
} from "./utils";
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
    const { boardStore } = useUIStore();

    const icon = getChipIconByBetValue(total);
    const betValue = chipValueToString(total);
    const animate = boardStore.getChipResultAnimation(
      resultStore.result,
      value
    );
    return <ChipIcon value={betValue} icon={icon} animate={animate} />;
  }
);

export const BoardItem = memo(
  ({ value, total }: { value: Field; total?: number }) => {
    return (
      <div className="board__field" data-value={value} style={{ zIndex: 10 }}>
        {total && <BoardChip total={total} value={value} />}
      </div>
    );
  }
);
