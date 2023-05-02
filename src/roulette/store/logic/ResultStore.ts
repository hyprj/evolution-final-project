import { NumericField } from "@roulette/utils/types";
import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

export class ResultStore {
  private rootStore: RootStore;

  public result: NumericField | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  public async drawResult(): Promise<NumericField> {
    return new Promise((resolve) => {
      this.rootStore.socketStore.server.emit("spin");
      this.rootStore.socketStore.server.on(
        "winning-number",
        (winningNumber) => {
          resolve(winningNumber as NumericField);
        }
      );
    });
  }

  public saveResult(result: NumericField) {
    this.result = result;
  }

  public clear(): void {
    this.result = null;
  }
}
