import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { BetValue, NumericBetValue } from "@roulette/utils/types";
import {
  isBetValue,
  normalizeBetValue,
  fieldToHoverByValue,
  isWinningValue,
} from "@roulette/utils/utils";
import { Phase } from "./PhaseStore";

export type ChipAnimationPhase = "none" | "winning" | "losing";

export class UIStore {
  public readonly rootStore: RootStore;

  public hoveredFields: BetValue[];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.hoveredFields = [];
  }

  // private setPhase(phase: Phase): void {
  //   this.rootStore.phaseStore.phase = phase;
  // }

  // public animateSpinning(): void {
  //   this.setPhase("spinning");
  //   setTimeout(() => {
  //     runInAction(() => {
  //       this.setPhase("resolved");
  //     });
  //   }, 3000);
  //   setTimeout(() => {
  //     runInAction(() => {
  //       this.setPhase("awarding");
  //     });
  //   }, 6000);
  //   setTimeout(() => {
  //     runInAction(() => {
  //       this.setPhase("betting");
  //     });
  //   }, 9000);
  // }

  private getResult(): NumericBetValue | null {
    return this.rootStore.resultStore.result;
  }

  private getPhase(): Phase {
    return this.rootStore.phaseStore.phase;
  }

  public getAnimationStatusForField(betValue: BetValue): ChipAnimationPhase {
    if (this.getPhase() === "awarding") {
      if (isWinningValue(betValue, this.getResult()!)) {
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

  public getBoardAnimationStatus() {
    const phase = this.getPhase();
    if (phase === "spinning") {
      return "board--active";
    } else if (phase === "resolved") {
      return "board--active-return";
    }
    return "";
  }
}
