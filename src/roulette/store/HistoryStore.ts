import { BetValue, Bet } from "@roulette/utils/types";
import { shallowCloneBetMap } from "@roulette/utils/utils";
import { makeAutoObservable } from "mobx";
import { BettingStore } from "./BettingStore";

export class HistoryStore {
  public readonly bettingStore: BettingStore;

  public currentValues: BetValue[];
  public previousValues: BetValue[];
  public previousBet: Map<BetValue, Bet> | null;
  public previousBetValue: number;

  constructor(bettingStore: BettingStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.bettingStore = bettingStore;
    this.currentValues = [];
    this.previousValues = [];
    this.previousBetValue = 0;
    this.previousBet = null;
  }

  public getPreviousBetStep(): Bet | undefined {
    const lastBetValue = this.currentValues.at(-1);

    if (lastBetValue) {
      return this.bettingStore.bets.get(lastBetValue);
    }
  }

  public hasPreviousBet(): boolean {
    return typeof this.previousBet?.size === "number";
  }

  public addStep(betValue: BetValue): void {
    this.currentValues.push(betValue);
  }

  public saveBetHistory(bet: Map<BetValue, Bet>, betTotalValue: number) {
    this.previousBet = shallowCloneBetMap(bet);
    this.previousBetValue = betTotalValue;
    this.previousValues = [...this.currentValues];
  }
}
