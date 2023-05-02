import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { WheelStore } from "../ui/WheelStore";
import { getMultiplierBetter } from "@roulette/utils/consts";
import { isWinningValue, sumNumbers } from "@roulette/utils/utils";
import { NumericField } from "@roulette/utils/types";

export class GameStore {
  public readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }

  public async spin(wheelStore: WheelStore): Promise<void> {
    this.rootStore.phaseStore.phase = "bets-closed";
    const result = await this.rootStore.resultStore.drawResult();
    runInAction(() => {
      wheelStore.resultAnimationNumber = result;
    });
    wheelStore.spin();
    setTimeout(() => {
      runInAction(() => {
        this.resolveBet(result);
        this.rootStore.resultStore.saveResult(result);
      });
    }, 8000);
    setTimeout(() => {
      runInAction(() => {
        this.clearAfterBet();
        wheelStore.resultAnimationNumber = null;
      });
    }, 12000);
  }

  private getPrize(result: NumericField): number {
    let prize = -this.rootStore.bettingStore.totalBetValue;

    for (const [_, bet] of this.rootStore.bettingStore.bets) {
      if (isWinningValue(bet.field, result)) {
        const multiplier = getMultiplierBetter(bet.field);
        const totalChipsValue = sumNumbers(bet.chips);
        const profit = multiplier * totalChipsValue + totalChipsValue;

        prize += profit;
      }
    }
    return prize;
  }

  private resolveBet(result: NumericField): void {
    const wonPrize = this.getPrize(result);
    this.rootStore.bettingStore.betHistoryStore.saveRecentNumber();
    this.rootStore.bettingStore.betHistoryStore.saveBetHistory(wonPrize);
    this.rootStore.playerStore.addBalance(wonPrize);
  }

  private clearAfterBet(): void {
    this.rootStore.phaseStore.phase = "bets-open";
    this.rootStore.resultStore.clear();
    this.rootStore.bettingStore.clear();
  }
}
