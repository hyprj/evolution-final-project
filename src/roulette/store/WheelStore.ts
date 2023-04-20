import { Vector3 } from "@babylonjs/core";
import { UIStore } from "./UIStore";
import { makeAutoObservable, runInAction } from "mobx";
import { BetValue, NumericBetValue } from "@roulette/utils/types";
import { isWinningValue } from "@roulette/utils/utils";
import { BettingStore } from "./BettingStore";
import { PhaseStore } from "./PhaseStore";
import { ResultStore } from "./ResultStore";

export class WheelStore {
  public readonly rootUIStore: UIStore;

  public cameraPos: Vector3;
  public wheelPhase: "idle" | "spinning" | "resolved";
  public secondsToResult: number | null;

  constructor(rootUIStore: UIStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootUIStore = rootUIStore;
    this.cameraPos = new Vector3(0, 3, 5);
    this.secondsToResult = null;
    this.wheelPhase = "idle";
  }

  public async spin(
    bettingStore: BettingStore,
    phaseStore: PhaseStore,
    resultStore: ResultStore
  ): Promise<void> {
    phaseStore.setPhase("bets-closed");
    this.wheelPhase = "spinning";
    await this.runCameraAnimation();
    runInAction(() => {
      bettingStore.resolve();
      this.wheelPhase = "resolved";
    });
    setTimeout(() => {
      runInAction(() => {
        bettingStore.clear();
        phaseStore.setPhase("bets-open");
        resultStore.clear();
        this.wheelPhase = "idle";
      });
    }, 1500);
  }

  private async runCameraAnimation(): Promise<string> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        runInAction(() => {
          this.cameraPos = new Vector3(2, 2, 2);
        });
      }, 2000);
      setTimeout(() => {
        runInAction(() => {
          this.cameraPos = new Vector3(0, 6, 0);
        });
      }, 4000);
      setTimeout(() => {
        runInAction(() => {
          this.cameraPos = new Vector3(0, 3, 5);
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
    winningNumber: NumericBetValue | null,
    betValue: BetValue
  ) {
    if (!winningNumber) {
      return "none";
    }
    if (isWinningValue(betValue, winningNumber)) {
      return "win-animation";
    }
    return "lose-animation";
  }

  private runTimeToResult() {
    let counter = 8;
    this.secondsToResult = --counter;
    const timeout = setInterval(() => {
      runInAction(() => {
        this.secondsToResult = --counter;
        if (counter === 0) {
          clearInterval(timeout);
        }
      });
    }, 1000);
  }
}
