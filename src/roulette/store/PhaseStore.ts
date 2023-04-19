import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

export type Phase = "betting" | "resolved" | "spinning" | "awarding";

export class PhaseStore {
  private readonly rootStore: RootStore;

  public phase: Phase;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.phase = "betting";
  }

  public async showSpin(): Promise<void> {
    this.rootStore.phaseStore.phase = "spinning";
    setTimeout(() => {}, 3000);
  }

  public spin(): void {
    this.phase = "spinning";
    setTimeout(() => {
      runInAction(() => {
        this.phase = "resolved";
      });
    }, 8000);
    setTimeout(() => {
      runInAction(() => {
        this.rootStore.bettingStore.resolve();
        this.phase = "awarding";
      });
    }, 8500);
    setTimeout(() => {
      runInAction(() => {
        this.rootStore.bettingStore.clear();
        this.phase = "betting";
      });
    }, 10000);
  }
}
