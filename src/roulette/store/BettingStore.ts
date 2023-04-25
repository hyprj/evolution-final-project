import { Bet, Chip, Field, NumericField } from "@roulette/utils/types";
import {
  isBiggerThanMaxPossibleAmount,
  isWinningValue,
  sumNumbers,
} from "@roulette/utils/utils";
import { makeAutoObservable } from "mobx";
import { BetHistoryStore } from "./BetHistoryStore";
import { RootStore } from "./RootStore";
import { getMultiplierBetter } from "@roulette/utils/consts";

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

  private addWonPrize(prize: number) {
    this.rootStore.playerStore.addBalance(prize);
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

  private getPrize(result: NumericField): number {
    let prize = -this.totalBetValue;

    for (const [_, bet] of this.bets) {
      if (isWinningValue(bet.field, result)) {
        const multiplier = getMultiplierBetter(bet.field);
        const totalChipsValue = sumNumbers(bet.chips);
        const profit = multiplier * totalChipsValue + totalChipsValue;

        prize += profit;
      }
    }
    return prize;
  }

  public clear(): void {
    this.totalBetValue = 0;
    this.bets.clear();
    this.betHistoryStore.currentValues = [];
  }

  public resolve(): void {
    const result = this.rootStore.resultStore.drawResult();
    const wonPrize = this.getPrize(result);
    this.betHistoryStore.saveBetHistory(
      this.bets,
      this.totalBetValue,
      wonPrize
    );
    this.betHistoryStore.saveRecentNumber(result);
    this.addWonPrize(wonPrize);
  }
}
