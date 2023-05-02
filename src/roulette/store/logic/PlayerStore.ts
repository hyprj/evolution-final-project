import { Chip } from "@roulette/utils/types";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class PlayerStore {
  public readonly rootStore: RootStore;

  public balance: number;
  public chip: Chip;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.balance = 1000;
    this.chip = 5;
  }

  public setChip(chipValue: Chip): void {
    this.chip = chipValue;
  }

  public addBalance(amount: number): void {
    const updatedBalance = this.balance + amount;
    this.updateBalance(updatedBalance);
  }

  public updateBalance(balance: number): void {
    this.balance = balance;
  }
}
