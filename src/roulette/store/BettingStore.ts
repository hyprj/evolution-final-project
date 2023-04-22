import { Bet, Chip, Field, NumericField } from "@roulette/utils/types";
import {
  isBiggerThanMaxPossibleAmount,
  isWinningValue,
  sumArray,
} from "@roulette/utils/utils";
import { makeAutoObservable, observable } from "mobx";
import { HistoryStore } from "./HistoryStore";
import { RootStore } from "./RootStore";
import { getMultiplierBetter } from "@roulette/utils/consts";
import { FiberRawCubeTexturePropsHandler } from "react-babylonjs";

export class BettingStore {
  public readonly rootStore: RootStore;
  public readonly historyStore: HistoryStore;

  public bets: Map<Field, Bet>;
  public totalBetValue: number;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.bets = observable.map();
    this.historyStore = new HistoryStore(this);
    this.totalBetValue = 0;
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

    this.historyStore.addStep(field);
    this.totalBetValue += selectedChip;
    return true;
  }

  public undo(): void {
    const lastBet = this.historyStore.getPreviousBetStep();

    if (lastBet) {
      if (lastBet.chips.length === 1) {
        this.bets.delete(lastBet.field);
      } else {
        lastBet.amount -= lastBet.chips.at(-1)!;
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

  private getPrize(result: NumericField): number {
    let prize = -this.totalBetValue;

    for (const [_, bet] of this.bets) {
      if (isWinningValue(bet.field, result)) {
        const multiplier = getMultiplierBetter(bet.field);
        const totalChipsValue = sumArray(bet.chips);
        const profit = multiplier * totalChipsValue;

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

  public resolve(): void {
    const result = this.rootStore.resultStore.drawResult();
    const wonPrize = this.getPrize(result);
    this.historyStore.saveBetHistory(this.bets, this.totalBetValue, wonPrize);
    this.historyStore.saveWinningNumber(result);
    this.addWonPrize(wonPrize);
  }
}
