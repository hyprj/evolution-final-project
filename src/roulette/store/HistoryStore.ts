import { BetValue, Bet, NumericBetValue } from "@roulette/utils/types";
import { shallowCloneBetMap } from "@roulette/utils/utils";
import { makeAutoObservable } from "mobx";
import { BettingStore } from "./BettingStore";

export class HistoryStore {
  public readonly bettingStore: BettingStore;

  public currentValues: BetValue[];
  public previousValues: BetValue[];
  public previousBet: Map<BetValue, Bet> | null;
  public previousBetValue: number;
  public previousWonPrizes: number[];
  public lastWinningNumbers: NumericBetValue[];

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
    const lastBetValue = this.currentValues.at(-1);

    console.log(this.currentValues);

    if (lastBetValue) {
      return this.bettingStore.bets.get(lastBetValue);
    }
  }

  public saveWinningNumber(number: NumericBetValue) {
    this.lastWinningNumbers.push(number);
  }

  public hasPreviousBet(): boolean {
    return typeof this.previousBet?.size === "number";
  }

  public addStep(betValue: BetValue): void {
    this.currentValues.push(betValue);
  }

  public saveBetHistory(
    bet: Map<BetValue, Bet>,
    betTotalValue: number,
    wonPrize: number
  ) {
    this.previousBet = shallowCloneBetMap(bet);
    this.previousBetValue = betTotalValue;
    this.previousValues = [...this.currentValues];
    this.previousWonPrizes.push(wonPrize);
  }
}
