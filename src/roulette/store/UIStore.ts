import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { BetValue, NumericBetValue } from "@roulette/utils/types";
import {
  isBetValue,
  normalizeBetValue,
  fieldToHoverByValue,
  isWinningValue,
} from "@roulette/utils/utils";
import { Phase } from "./PhaseStore";
import { Vector3 } from "@babylonjs/core";

export type ChipAnimationPhase = "none" | "winning" | "losing";

export class UIStore {
  public readonly rootStore: RootStore;

  public hoveredFields: BetValue[];
  public cameraPos: Vector3;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.hoveredFields = [];
    this.cameraPos = new Vector3(0, 3, 5);
  }

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

  public runCameraAnimation(): void {
    setTimeout(() => {
      runInAction(() => {
        this.cameraPos = new Vector3(2, 2, 2);
      });
    }, 2000);
    setTimeout(() => {
      runInAction(() => {
        this.cameraPos = new Vector3(0, 6, 0);
      });
    }, 4000);
    setTimeout(() => {
      runInAction(() => {
        this.cameraPos = new Vector3(0, 3, 5);
      });
    }, 8000);
  }
}
