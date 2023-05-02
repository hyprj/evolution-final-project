import { makeAutoObservable } from "mobx";
import { Field } from "@roulette/utils/types";
import {
  isField,
  normalizeField,
  fieldToHoverByValue,
} from "@roulette/utils/utils";
import { WheelStore } from "./WheelStore";
import { NotificationStore } from "./NotificationStore";
import { RootStore } from "../logic/RootStore";

export type ChipAnimationPhase = "none" | "win-animation" | "lose-animation";

export class UIStore {
  public readonly rootStore: RootStore;

  public hoveredFields: Field[];

  public wheelStore: WheelStore;
  public notificationStore: NotificationStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.hoveredFields = [];
    this.wheelStore = new WheelStore(this);
    this.notificationStore = new NotificationStore(this);
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
