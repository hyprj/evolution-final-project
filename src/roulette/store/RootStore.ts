import { BettingStore } from "./BettingStore";
import { PlayerStore } from "./PlayerStore";
import { makeAutoObservable } from "mobx";

export class RootStore {
  public readonly playerStore: PlayerStore;
  public readonly bettingStore: BettingStore;

  constructor() {
    makeAutoObservable(this);
    this.playerStore = new PlayerStore(this);
    this.bettingStore = new BettingStore(this);
  }
}
