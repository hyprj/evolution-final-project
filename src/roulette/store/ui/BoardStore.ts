import { makeAutoObservable } from "mobx";
import { UIStore } from "./UIStore";
import { Field, NumericField } from "@roulette/utils/types";
import {
  isField,
  normalizeField,
  fieldToHoverByValue,
  isWinningValue,
} from "@roulette/utils/utils";

export class BoardStore {
  public readonly rootUIStore: UIStore;

  public hoveredFields: Field[] = [];
  public boardPhase: "betting" | "spinning" = "betting";

  constructor(rootUIStore: UIStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootUIStore = rootUIStore;
  }

  public getChipResultAnimation(
    winningNumber: NumericField | null,
    betValue: Field
  ) {
    if (!winningNumber) {
      return "none";
    }
    if (isWinningValue(betValue, winningNumber)) {
      return "win-animation";
    }
    return "lose-animation";
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
