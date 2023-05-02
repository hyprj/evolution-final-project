import { makeAutoObservable } from "mobx";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { RootStore } from "./RootStore";

export class SocketStore {
  public readonly rootStore: RootStore;
  public readonly server: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.server = io(
      import.meta.env.MODE === "production"
        ? "https://roulette-backend.herokuapp.com"
        : "localhost:8000"
    );
  }
}
