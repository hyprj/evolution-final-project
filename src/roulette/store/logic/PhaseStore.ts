import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export type Phase = "bets-open" | "bets-closed";

export class PhaseStore {
  private readonly rootStore: RootStore;

  public phase: Phase = "bets-open";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }
}
