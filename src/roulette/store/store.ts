import { makeAutoObservable, observable, runInAction } from "mobx";
import { BetValue, ChipValue, NumericBetValue } from "../utils/types";
import {
  fieldToHoverByValue,
  getMultiplier,
  isWinningValue,
  normalizeBetValue,
  sumArray,
} from "../utils/utils";
import { isBetValue } from "../utils/utils";

export interface Bet {
  value: BetValue;
  chips: ChipValue[];
}

export type ChipAnimationPhase = "none" | "winning" | "losing";

export class RouletteStore {
  public bets: Map<BetValue, Bet>;
  public currentBetHistory: BetValue[];
  public betsAmount: number;
  public status: "betting-phase" | "spinning-phase" | "resolved-phase";
  public winningSlot: NumericBetValue | null;
  public selectedChip: ChipValue;
  public balance: number;
  public hoveredFields: BetValue[] = [];

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init(): void {
    this.bets = observable.map();
    this.status = "betting-phase";
    this.winningSlot = null;
    this.selectedChip = 10;
    this.betsAmount = 0;
    this.balance = 1000;
    this.hoveredFields = [];
    this.currentBetHistory = [];
  }

  public placeBet(bet: BetValue): void {
    const existingBet = this.bets.get(bet);

    if (existingBet) {
      const updatedBet = {
        ...existingBet,
        chips: [...existingBet.chips, this.selectedChip],
      };
      this.bets.set(bet, updatedBet);
    } else {
      this.bets.set(bet, {
        value: bet,
        chips: [this.selectedChip],
      });
    }

    this.currentBetHistory.push(bet);

    this.betsAmount += this.selectedChip;
  }

  public spin(): void {
    if (this.status !== "betting-phase") {
      return;
    }
    this.status = "resolved-phase";
    // const winningSlot = getRandomWinningNumber();
    const winningSlot = 3;
    this.winningSlot = winningSlot;
    // this.status = "betting-phase";
    setTimeout(() => {
      runInAction(() => {
        this.status = "betting-phase";
      });
    }, 3000);
    this.resolveBets();
  }

  private resolveBets() {
    let prizePool = 0;

    this.bets.forEach((bet) => {
      if (isWinningValue(bet.value, this.winningSlot!)) {
        const multiplier = getMultiplier(bet.value);
        const totalChipsValue = sumArray(bet.chips);
        const profit = multiplier * totalChipsValue + totalChipsValue;

        prizePool += profit;
      }
      this.balance += prizePool - this.betsAmount;
      this.status = "resolved-phase";
    });

    this.resetBet();
  }

  public setChip(chipValue: ChipValue): void {
    this.selectedChip = chipValue;
  }

  public undoBet(): void {
    const lastBet = this.bets.get(this.currentBetHistory.at(-1)!);

    if (lastBet) {
      if (lastBet.chips.length === 1) {
        this.bets.delete(lastBet.value);
      }
      const chipValue = lastBet.chips.pop()!;
      this.betsAmount -= chipValue;
    }
  }

  public repeatBet(): void {}

  public resetBet(): void {
    this.bets.clear();
    this.betsAmount = 0;
    this.currentBetHistory = [];
  }

  public getAnimationStatusForField(betValue: BetValue): ChipAnimationPhase {
    if (this.status === "resolved-phase") {
      if (isWinningValue(betValue, this.winningSlot!)) {
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
