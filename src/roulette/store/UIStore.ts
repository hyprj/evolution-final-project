import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { BetValue } from "@roulette/utils/types";
import {
  isBetValue,
  normalizeBetValue,
  fieldToHoverByValue,
} from "@roulette/utils/utils";
import { WheelStore } from "./WheelStore";

export type ChipAnimationPhase = "none" | "win-animation" | "lose-animation";

export class UIStore {
  public readonly rootStore: RootStore;

  public hoveredFields: BetValue[];

  public wheelStore: WheelStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.hoveredFields = [];
    this.wheelStore = new WheelStore(this);
  }

  public onBoardHover(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const dataValue = (e.target as HTMLElement).dataset.value;
    if (dataValue && isBetValue(dataValue)) {
      const betValue = normalizeBetValue(dataValue);
      const fieldsToHover = fieldToHoverByValue(betValue);
      this.hoveredFields = fieldsToHover;
    } else {
      this.hoveredFields = [];
    }
  }

  public onBoardExit(): void {
    this.hoveredFields = [];
  }
}
