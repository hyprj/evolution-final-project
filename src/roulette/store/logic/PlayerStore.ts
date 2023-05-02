import { Chip } from "@roulette/utils/types";
import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { authStore } from "@main/features/auth/store";

export class PlayerStore {
  public readonly rootStore: RootStore;

  public balance: number = 0;
  public chip: Chip = 5;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    if (authStore.user) {
      this.balance = authStore.user.balance;
    }
  }

  public setChip(chipValue: Chip): void {
    this.chip = chipValue;
  }

  public updateBalance(balanceChange: number): void {
    runInAction(() => {
      this.balance += balanceChange;
      authStore.setBalance(this.balance);
    });
  }
}
