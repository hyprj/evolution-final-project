import { render } from "@testing-library/react";
import { StoresProvider, useRootStore, useUIStore } from "./StoresProvider";
import { observer } from "mobx-react";
import { describe, it, expect } from "vitest";

const UseStoreTestComponent = observer(() => {
  const rootStore = useRootStore();
  const uiStore = useUIStore();

  return (
    <div>
      <div>{rootStore.phaseStore.phase}</div>
      <div>{uiStore.wheelStore.wheelPhase}</div>
    </div>
  );
});

describe("StoresProvider", () => {
  it("useStore should be accesible inside <StoresProvider/>", () => {
    expect(
      render(
        <StoresProvider>
          <UseStoreTestComponent />
        </StoresProvider>
      )
    ).not.toThrow();
  });
});
