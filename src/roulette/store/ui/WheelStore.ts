import { AnimationGroup, FreeCamera, Vector3 } from "@babylonjs/core";
import { UIStore } from "./UIStore";
import { makeAutoObservable, runInAction } from "mobx";
import { NumericField } from "@roulette/utils/types";

export class WheelStore {
  public readonly rootUIStore: UIStore;

  public camera: FreeCamera | null = null;
  public wheelPhase: "idle" | "spinning" = "idle";
  public wheelAnimation: AnimationGroup | null = null;
  public ballAnimation: AnimationGroup | null = null;
  public resultAnimationNumber: NumericField | null = null;

  constructor(rootUIStore: UIStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootUIStore = rootUIStore;
  }

  public registerCamera(camera: FreeCamera): void {
    this.camera = camera;
  }

  public async spin(): Promise<void> {
    this.startSpinning();
    await this.runCameraAnimation();
    this.stopSpinning();
  }

  private async runCameraAnimation(): Promise<string> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        runInAction(() => {
          (this.camera as FreeCamera).position = new Vector3(3, 3, 3);
          (this.camera as FreeCamera).target = new Vector3(1, 1, 1);
        });
      }, 2000);
      setTimeout(() => {
        runInAction(() => {
          (this.camera as FreeCamera).position = new Vector3(0, 9, 1);
          (this.camera as FreeCamera).target = new Vector3(0, 0, 1);
        });
      }, 4000);
      setTimeout(() => {
        runInAction(() => {
          (this.camera as FreeCamera).position = new Vector3(0, 3, 5);
          (this.camera as FreeCamera).target = new Vector3(0, 0, 0);
          resolve("done");
        });
      }, 8000);
    });
  }

  private startSpinning(): void {
    runInAction(() => {
      this.wheelPhase = "spinning";
      this.rootUIStore.boardStore.boardPhase = "spinning";
      this.wheelAnimation?.play();
      this.ballAnimation?.play();
    });
  }

  private stopSpinning(): void {
    runInAction(() => {
      this.wheelPhase = "idle";
      this.rootUIStore.boardStore.boardPhase = "betting";
      this.wheelAnimation?.stop();
      this.ballAnimation?.stop();
    });
  }
}
