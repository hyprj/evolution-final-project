import { Bet, Chip, Field } from "@roulette/utils/types";
import { isBiggerThanMaxPossibleAmount } from "@roulette/utils/utils";
import { makeAutoObservable } from "mobx";
import { BetHistoryStore } from "./BetHistoryStore";
import { RootStore } from "./RootStore";

export class BettingStore {
  public readonly rootStore: RootStore;
  public readonly betHistoryStore: BetHistoryStore = new BetHistoryStore(this);

  public bets: Map<Field, Bet> = new Map();
  public totalBetValue: number = 0;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }

  private getSelectedChip(): Chip {
    return this.rootStore.playerStore.chip;
  }

  /**
   * @returns {boolean} boolean whether the bet was successfully placed on the given field due to maximum values limitations.
   */

  public place(field: Field): boolean {
    const existingBet = this.bets.get(field);
    const selectedChip = this.getSelectedChip();

    if (existingBet) {
      const amount = existingBet.amount + selectedChip;
      if (isBiggerThanMaxPossibleAmount(field, amount)) {
        return false;
      }
      this.bets.set(field, {
        amount: amount,
        field: field,
        chips: [...existingBet.chips, selectedChip],
      });
    } else {
      this.bets.set(field, {
        field: field,
        amount: selectedChip,
        chips: [selectedChip],
      });
    }

    this.betHistoryStore.addStep(field);
    this.totalBetValue += selectedChip;
    return true;
  }

  public undo(): void {
    const lastBet = this.betHistoryStore.getPreviousBetStep();

    if (lastBet) {
      if (lastBet.chips.length === 1) {
        this.bets.delete(lastBet.field);
      } else {
        lastBet.amount -= lastBet.chips.at(-1)!;
      }
      const chipValue = lastBet.chips.pop()!;
      this.betHistoryStore.currentValues.pop();
      this.totalBetValue -= chipValue;
    }
  }

  public repeat(): void {
    if (this.betHistoryStore.previousBet) {
      this.bets = this.betHistoryStore.previousBet;
      this.totalBetValue = this.betHistoryStore.previousBetValue;
      this.betHistoryStore.currentValues = this.betHistoryStore.previousValues;
    }
  }

  public clear(): void {
    this.bets.clear();
    this.totalBetValue = 0;
    this.betHistoryStore.currentValues = [];
  }
}
