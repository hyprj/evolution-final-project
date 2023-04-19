import { NumericBetValue } from "@roulette/utils/types";
import { RootStore } from "./RootStore";
import { makeAutoObservable } from "mobx";

export class ResultStore {
  private rootStore: RootStore;

  public result: NumericBetValue | null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.result = null;
  }

  public drawResult(): NumericBetValue {
    this.result = 3;
    return this.result;
  }

  public clear(): void {
    this.result = null;
  }
}
