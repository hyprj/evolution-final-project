import { BetValue, Bet, ChipValue } from "@roulette/utils/types";
import { isWinningValue, getMultiplier, sumArray } from "@roulette/utils/utils";
import { makeAutoObservable, observable, runInAction } from "mobx";
import { HistoryStore } from "./HistoryStore";
import { RootStore } from "./RootStore";

export class BettingStore {
  public readonly rootStore: RootStore;
  public readonly historyStore: HistoryStore;

  public bets: Map<BetValue, Bet>;
  public totalBetValue: number;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.bets = observable.map();
    this.historyStore = new HistoryStore(this);
    this.totalBetValue = 0;
  }

  private getSelectedChip(): ChipValue {
    return this.rootStore.playerStore.chip;
  }

  private addWonPrize(prize: number) {
    this.rootStore.playerStore.addBalance(prize);
  }

  public place(betValue: BetValue): void {
    const existingBet = this.bets.get(betValue);
    const selectedChip = this.getSelectedChip();

    if (existingBet) {
      this.bets.set(betValue, {
        value: betValue,
        chips: [...existingBet.chips, selectedChip],
      });
    } else {
      this.bets.set(betValue, { value: betValue, chips: [selectedChip] });
    }

    this.historyStore.addStep(betValue);
    this.totalBetValue += selectedChip;
  }

  public undo(): void {
    const lastBet = this.historyStore.getPreviousBetStep();

    if (lastBet) {
      if (lastBet.chips.length === 1) {
        this.bets.delete(lastBet.value);
      }
      const chipValue = lastBet.chips.pop()!;
      this.totalBetValue -= chipValue;
    }
  }

  public repeat(): void {
    if (this.historyStore.previousBet) {
      this.bets = this.historyStore.previousBet;
      this.totalBetValue = this.historyStore.previousBetValue;
      this.historyStore.currentValues = this.historyStore.previousValues;
    }
  }

  private getPrize(): number {
    let prize = -this.totalBetValue;
    const result = this.rootStore.resultStore.drawResult();

    for (const [_, bet] of this.bets) {
      if (isWinningValue(bet.value, result)) {
        const multiplier = getMultiplier(bet.value);
        const totalChipsValue = sumArray(bet.chips);
        const profit = multiplier * totalChipsValue + totalChipsValue;

        prize += profit;
      }
    }
    return prize;
  }

  public clear(): void {
    this.totalBetValue = 0;
    this.bets.clear();
    this.historyStore.currentValues = [];
  }

  public spin() {
    const wonPrize = this.getPrize();
    this.rootStore.phaseStore.phase = "spinning";
    setTimeout(() => {
      runInAction(() => {
        this.rootStore.phaseStore.phase = "resolved";
      });
    }, 3000);
    setTimeout(() => {
      runInAction(() => {
        this.rootStore.phaseStore.phase = "awarding";
      });
    }, 6000);
    setTimeout(() => {
      runInAction(() => {
        this.historyStore.saveBetHistory(this.bets, this.totalBetValue);
        this.addWonPrize(wonPrize);
        this.clear();
        this.rootStore.phaseStore.phase = "betting";
      });
    }, 9000);
  }
}
