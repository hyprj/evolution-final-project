import { makeAutoObservable } from "mobx";
import { WheelStore } from "./WheelStore";
import { NotificationStore } from "./NotificationStore";
import { RootStore } from "../logic/RootStore";
import { BoardStore } from "./BoardStore";

export class UIStore {
  public readonly rootStore: RootStore;

  public boardStore: BoardStore;
  public wheelStore: WheelStore;
  public notificationStore: NotificationStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
    this.boardStore = new BoardStore(this);
    this.wheelStore = new WheelStore(this);
    this.notificationStore = new NotificationStore(this);
  }
}
