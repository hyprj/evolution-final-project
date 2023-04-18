// import { makeAutoObservable, runInAction } from "mobx";
// import { NumericBetValue } from "../utils/types";
// import { RootStore } from "./RootStore";

// export class GameStore {
//   public readonly rootStore: RootStore;

//   public status: GameStatus;
//   public winningSlot: NumericBetValue;

//   constructor(rootStore: RootStore) {
//     makeAutoObservable(this);
//     this.rootStore = rootStore;
//     this.status = "betting-phase";
//     this.winningSlot = 0;
//   }

//   public spin(): void {
//     if (this.status === "betting-phase") {
//       this.status = "spinning-phase";
//       const winningSlot = 3;
//       this.winningSlot = winningSlot;
//       setTimeout(() => {
//         runInAction(() => {
//           this.status = "betting-phase";
//         });
//       }, 3000);
//       this.resolve();
//     }
//   }

//   private resolve(): void {
//     const wonPrize = this.rootStore.bettingStore.resolve(this.winningSlot);
//     this.rootStore.playerStore.addBalance(wonPrize);
//   }
// }
