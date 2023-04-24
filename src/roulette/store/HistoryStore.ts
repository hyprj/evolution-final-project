import { Field, Bet, NumericField } from "@roulette/utils/types";
import { shallowCloneBetMap } from "@roulette/utils/utils";
import { makeAutoObservable } from "mobx";
import { BettingStore } from "./BettingStore";

export class HistoryStore {
  public readonly bettingStore: BettingStore;

  public currentValues: Field[];
  public previousValues: Field[];
  public previousBet: Map<Field, Bet> | null;
  public previousBetValue: number;
  public previousWonPrizes: number[];
  public lastWinningNumbers: NumericField[];

  constructor(bettingStore: BettingStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.bettingStore = bettingStore;
    this.currentValues = [];
    this.previousValues = [];
    this.previousBetValue = 0;
    this.previousBet = null;
    this.previousWonPrizes = [];
    this.lastWinningNumbers = [];
  }

  public getPreviousBetStep(): Bet | undefined {
    console.log("current values, ", this.currentValues);
    const lastBetValue = this.currentValues.at(-1);

    if (lastBetValue) {
      return this.bettingStore.bets.get(lastBetValue);
    }
  }

  public saveWinningNumber(number: NumericField) {
    this.lastWinningNumbers.push(number);
  }

  public hasPreviousBet(): boolean {
    return typeof this.previousBet?.size === "number";
  }

  public addStep(betValue: Field): void {
    this.currentValues.push(betValue);
  }

  public saveBetHistory(
    bet: Map<Field, Bet>,
    betTotalValue: number,
    wonPrize: number
  ) {
    this.previousBet = shallowCloneBetMap(bet);
    this.previousBetValue = betTotalValue;
    this.previousValues = [...this.currentValues];
    this.previousWonPrizes.push(wonPrize);
  }
}
