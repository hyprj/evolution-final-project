import { makeAutoObservable, observable, runInAction } from "mobx";
import { BetValue, ChipValue, NumericBetValue } from "../utils/types";
import { getMultiplier, isWinningValue, sumArray } from "../utils/utils";

export interface Bet {
  value: BetValue;
  chips: ChipValue[];
}

export type ChipAnimationPhase = "none" | "winning" | "losing";

// root store (bussiness logic) //chip, balance stores
// ui store
//

export class RouletteStore {
  public bets: Map<BetValue, Bet>;
  public betsAmount: number;
  public status: "betting-phase" | "spinning-phase" | "resolved-phase";
  public winningSlot: NumericBetValue | null;
  public selectedChip: ChipValue;
  public balance: number;

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
  }

  public setChip(chipValue: ChipValue): void {
    this.selectedChip = chipValue;
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

  // public handleMouseOver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  //   console.log(e.target.dataset);
  // }
}
