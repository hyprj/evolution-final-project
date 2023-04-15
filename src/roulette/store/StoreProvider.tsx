import { PropsWithChildren, createContext, useContext } from "react";
import { RouletteStore } from "./store";

const StoreContext = createContext<null | RouletteStore>(null);

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreContext.Provider value={new RouletteStore()}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within the StoreProvider.");
  }

  return context;
};
