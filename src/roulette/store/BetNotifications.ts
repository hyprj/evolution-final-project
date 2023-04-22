import { makeAutoObservable, runInAction } from "mobx";
import { UIStore } from "./UIStore";

export class BetNotifications {
  public readonly rootUIStore: UIStore;
  public notifications: string[];

  constructor(rootUIStore: UIStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootUIStore = rootUIStore;
    this.notifications = [];
  }

  public addNotification(notification: string): void {
    this.notifications.push(notification);
    setTimeout(() => {
      runInAction(() => {
        this.removeNotification();
      });
    }, 1500);
  }

  private removeNotification(): void {
    this.notifications.shift();
  }
}
