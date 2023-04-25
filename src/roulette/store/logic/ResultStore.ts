import { NumericField } from "@roulette/utils/types";
import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

const HIGHTEST_NUMERIC_BET_VALUE = 36;

export class ResultStore {
  private rootStore: RootStore;

  public result: NumericField | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  public drawResult(): NumericField {
    // this.result = this.getRandomNumericValue();
    const result = 3;
    return result;
  }

  public saveResult(result: NumericField) {
    this.result = result;
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
