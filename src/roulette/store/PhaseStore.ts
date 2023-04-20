import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

export type Phase = "bets-open" | "bets-closed";

export class PhaseStore {
  private readonly rootStore: RootStore;

  public phase: Phase;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.phase = "bets-open";
  }

  public setPhase(phase: Phase) {
    console.log("wtf");
    this.phase = phase;
  }
}
