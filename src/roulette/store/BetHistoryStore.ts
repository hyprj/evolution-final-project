import { Field, Bet, NumericField } from "@roulette/utils/types";
import { shallowCloneBetMap } from "@roulette/utils/utils";
import { makeAutoObservable } from "mobx";
import { BettingStore } from "./BettingStore";

export class BetHistoryStore {
  public readonly bettingStore: BettingStore;

  public currentValues: Field[] = [];
  public previousValues: Field[] = [];
  public previousBet: Map<Field, Bet> | null = null;
  public previousBetValue: number = 0;
  public previousWonPrize: number | null = null;
  public recentNumbers: NumericField[] = [];

  constructor(bettingStore: BettingStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.bettingStore = bettingStore;
  }

  public getRecentNumber(): number | undefined {
    return this.recentNumbers.at(-1);
  }

  public getPreviousBetStep(): Bet | undefined {
    const lastBetValue = this.currentValues.at(-1);

    if (lastBetValue) {
      return this.bettingStore.bets.get(lastBetValue);
    }
  }

  public saveRecentNumber(number: NumericField) {
    this.recentNumbers.push(number);
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
    this.previousWonPrize = wonPrize;
  }
}
