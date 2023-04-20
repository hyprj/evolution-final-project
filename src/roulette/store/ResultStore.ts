import { NumericBetValue } from "@roulette/utils/types";
import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

const HIGHTEST_NUMERIC_BET_VALUE = 36;

export class ResultStore {
  private rootStore: RootStore;

  public result: NumericBetValue | null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.result = null;
  }

  public drawResult(): NumericBetValue {
    this.result = this.getRandomNumericValue();
    return this.result;
  }

  private getRandomNumericValue(): NumericBetValue {
    return Math.floor(
      Math.random() * HIGHTEST_NUMERIC_BET_VALUE
    ) as NumericBetValue;
  }

  public clear(): void {
    this.result = null;
  }
}
