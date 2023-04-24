import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { Field } from "@roulette/utils/types";
import {
  isField,
  normalizeField,
  fieldToHoverByValue,
} from "@roulette/utils/utils";
import { WheelStore } from "./WheelStore";
import { BetNotifications } from "./BetNotifications";

export type ChipAnimationPhase = "none" | "win-animation" | "lose-animation";

export class UIStore {
  public readonly rootStore: RootStore;

  public hoveredFields: Field[];

  public wheelStore: WheelStore;
  public betNotifications: BetNotifications;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.hoveredFields = [];
    this.wheelStore = new WheelStore(this);
    this.betNotifications = new BetNotifications(this);
  }

  public onBoardHover(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const dataValue = (e.target as HTMLElement).dataset.value;
    if (dataValue && isField(dataValue)) {
      const betValue = normalizeField(dataValue);
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
