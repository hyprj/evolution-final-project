import { BettingStore } from "./BettingStore";
import { PhaseStore } from "./PhaseStore";
import { PlayerStore } from "./PlayerStore";
import { makeAutoObservable } from "mobx";
import { ResultStore } from "./ResultStore";
import { GameStore } from "./GameStore";
import { SocketStore } from "./SocketStore";

export class RootStore {
  public readonly playerStore: PlayerStore;
  public readonly bettingStore: BettingStore;
  public readonly phaseStore: PhaseStore;
  public readonly resultStore: ResultStore;
  public readonly gameStore: GameStore;
  public readonly socketStore: SocketStore;

  constructor() {
    makeAutoObservable(this);
    this.socketStore = new SocketStore(this);
    this.playerStore = new PlayerStore(this);
    this.bettingStore = new BettingStore(this);
    this.phaseStore = new PhaseStore(this);
    this.resultStore = new ResultStore(this);
    this.gameStore = new GameStore(this);
  }
}
