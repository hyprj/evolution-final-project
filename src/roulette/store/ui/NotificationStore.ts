import { makeAutoObservable, runInAction } from "mobx";
import { UIStore } from "./UIStore";

export class NotificationStore {
  public readonly rootUIStore: UIStore;
  public notifications: string[] = [];

  constructor(rootUIStore: UIStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootUIStore = rootUIStore;
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
