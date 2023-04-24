import { NumericField } from "@roulette/utils/types";
import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

const HIGHTEST_NUMERIC_BET_VALUE = 36;

export class ResultStore {
  private rootStore: RootStore;

  public result: NumericField | null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.result = null;
  }

  public drawResult(): NumericField {
    // this.result = this.getRandomNumericValue();
    this.result = 3;
    return this.result;
  }

  private getRandomNumericValue(): NumericField {
    return Math.floor(
      Math.random() * HIGHTEST_NUMERIC_BET_VALUE
    ) as NumericField;
  }

  public clear(): void {
    this.result = null;
  }
}
