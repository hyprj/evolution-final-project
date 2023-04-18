import { makeAutoObservable } from "mobx";
import { BetValue, NumericBetValue } from "../utils/types";
import {
  isWinningValue,
  isBetValue,
  normalizeBetValue,
  fieldToHoverByValue,
} from "../utils/utils";
import { GameStatus } from "./BettingStore";
import { RootStore } from "./RootStore";

export type ChipAnimationPhase = "none" | "winning" | "losing";

export class UIStore {
  public readonly rootStore: RootStore;

  public hoveredFields: BetValue[];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.hoveredFields = [];
  }

  private getWinningSlot(): NumericBetValue | null {
    return this.rootStore.bettingStore.winningNumber;
  }

  private getStatus(): GameStatus {
    return this.rootStore.bettingStore.status;
  }

  public getAnimationStatusForField(betValue: BetValue): ChipAnimationPhase {
    if (this.getStatus() === "resolved-phase") {
      if (isWinningValue(betValue, this.getWinningSlot()!)) {
        return "winning";
      }
      return "losing";
    }
    return "none";
  }

  public handleBoardHover(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const dataValue = (e.target as HTMLElement).dataset.value;
    if (dataValue && isBetValue(dataValue)) {
      const betValue = normalizeBetValue(dataValue);
      const fieldsToHover = fieldToHoverByValue(betValue);
      this.hoveredFields = fieldsToHover;
    } else {
      this.hoveredFields = [];
    }
  }
}
