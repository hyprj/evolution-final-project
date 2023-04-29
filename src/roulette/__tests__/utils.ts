import { useRootStore, useUIStore } from "@roulette/store/StoresProvider";
import { RootStore } from "@roulette/store/logic/RootStore";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function createMockRootStore(data: DeepPartial<RootStore>): RootStore {
  return data as RootStore;
}

export function StoresTestComponent() {
  const rootStore = useRootStore;
  const uiStore = useUIStore();
}
