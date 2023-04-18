import { makeAutoObservable } from "mobx";
import { BetValue } from "../utils/types";
import { BettingStore } from "./BettingStore";
import { Bet } from "./store";
import { shallowCloneBetMap } from "../utils/utils";

export class HistoryStore {
  public readonly bettingStore: BettingStore;

  public currentValues: BetValue[];
  public previousValues: BetValue[];
  public previousBet: Map<BetValue, Bet> | null;
  public previousBetValue: number;

  constructor(bettingStore: BettingStore) {
    makeAutoObservable(this);
    this.bettingStore = bettingStore;
    this.currentValues = [];
    this.previousValues = [];
    this.previousBetValue = 0;
    this.previousBet = new Map();
  }

  public getPreviousBetStep(): Bet | undefined {
    const lastBetValue = this.currentValues.at(-1);

    if (lastBetValue) {
      return this.bettingStore.bets.get(lastBetValue);
    }
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
