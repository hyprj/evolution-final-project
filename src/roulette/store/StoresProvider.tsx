import React, { createContext, useContext } from "react";
import { RootStore } from "./RootStore";
import { UIStore } from "./UIStore";

function initStores() {
  const rootStore = new RootStore();
  const uiStore = new UIStore(rootStore);
  return { rootStore, uiStore };
}

const RootStoreContext = createContext<null | RootStore>(null);
const UIStoreContext = createContext<null | UIStore>(null);

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

export const useUIStore = () => {
  const context = useContext(UIStoreContext);

  if (!context) {
    throw new Error("useUIStore must be used within the UIStoreProvider.");
  }

  return context;
};
