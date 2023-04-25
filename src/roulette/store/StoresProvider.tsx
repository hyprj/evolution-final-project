import React, { createContext, useContext } from "react";
import { RootStore } from "./logic/RootStore";
import { UIStore } from "./ui/UIStore";

function initStores() {
  const rootStore = new RootStore();
  const uiStore = new UIStore(rootStore);
  return { rootStore, uiStore };
}

export const RootStoreContext = createContext<null | RootStore>(null);
export const UIStoreContext = createContext<null | UIStore>(null);

export function StoresProvider({ children }: { children: React.ReactNode }) {
  const { rootStore, uiStore } = initStores();

  return (
    <RootStoreContext.Provider value={rootStore}>
      <UIStoreContext.Provider value={uiStore}>
        {children}
      </UIStoreContext.Provider>
    </RootStoreContext.Provider>
  );
}

export const useRootStore = () => {
  const context = useContext(RootStoreContext);

  if (!context) {
    throw new Error("useRootStore must be used within the RootStoreProvider.");
  }

  return context;
};

export const useUIStore = (): UIStore => {
  const context = useContext(UIStoreContext);

  if (!context) {
    throw new Error("useUIStore must be used within the UIStoreProvider.");
  }

  return context;
};
