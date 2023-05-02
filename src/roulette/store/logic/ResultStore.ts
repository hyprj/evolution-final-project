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

  public async drawResult(): Promise<NumericField> {
    return import.meta.env.MODE !== "production"
      ? new Promise((resolve) => {
          this.rootStore.socketStore.server.emit("spin");
          this.rootStore.socketStore.server.on(
            "winning-number",
            (winningNumber) => {
              resolve(winningNumber as NumericField);
            }
          );
        })
      : new Promise((resolve) => {
          resolve(this.getRandomNumericValue());
        });
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
