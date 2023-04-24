import { AnimationGroup, FreeCamera, Nullable, Vector3 } from "@babylonjs/core";
import { UIStore } from "./UIStore";
import { makeAutoObservable, runInAction } from "mobx";
import { Field, NumericField } from "@roulette/utils/types";
import { isWinningValue } from "@roulette/utils/utils";
import { BettingStore } from "./BettingStore";
import { PhaseStore } from "./PhaseStore";
import { ResultStore } from "./ResultStore";

export class WheelStore {
  public readonly rootUIStore: UIStore;

  public camera: Nullable<FreeCamera>;
  public wheelPhase: "idle" | "spinning" | "resolved";
  public secondsToResult: number | null;
  public spinAnimation: Nullable<AnimationGroup> | undefined;

  constructor(rootUIStore: UIStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootUIStore = rootUIStore;
    this.secondsToResult = null;
    this.wheelPhase = "idle";
    this.spinAnimation = null;
    this.camera = null;
  }

  public registerCamera(camera: FreeCamera): void {
    this.camera = camera;
  }

  public async spin(
    bettingStore: BettingStore,
    phaseStore: PhaseStore,
    resultStore: ResultStore
  ): Promise<void> {
    phaseStore.setPhase("bets-closed");
    this.wheelPhase = "spinning";
    this.spinAnimation?.play();
    await this.runCameraAnimation();
    runInAction(() => {
      bettingStore.resolve();
      this.wheelPhase = "resolved";
    });
    this.spinAnimation?.stop();
    setTimeout(() => {
      runInAction(() => {
        bettingStore.clear();
        phaseStore.setPhase("bets-open");
        resultStore.clear();
        this.wheelPhase = "idle";
      });
    }, 4000);
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
          (this.camera as FreeCamera).position = new Vector3(0, 6, 0);
          (this.camera as FreeCamera).target = new Vector3(0, 0, 0);
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

  public getBoardAnimation() {
    if (this.wheelPhase === "spinning") {
      return "board--tilted";
    }
    if (this.wheelPhase === "resolved") {
      ("board--resolved");
    }
    return "";
  }

  public getChipResultAnimation(
    winningNumber: NumericField | null,
    betValue: Field
  ) {
    if (!winningNumber) {
      return "none";
    }
    if (isWinningValue(betValue, winningNumber)) {
      return "win-animation";
    }
    return "lose-animation";
  }
}
