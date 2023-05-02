import { BettingStore } from "./BettingStore";
import { PhaseStore } from "./PhaseStore";
import { PlayerStore } from "./PlayerStore";
import { makeAutoObservable } from "mobx";
import { ResultStore } from "./ResultStore";
import { GameStore } from "./GameStore";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

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

export class SocketStore {
  public readonly rootStore: RootStore;
  public readonly server: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.server = io("localhost:8000");
  }
}
