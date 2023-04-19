import { Engine } from "react-babylonjs";

import { Suspense } from "react";
import { HUD } from "./features/hud/HUD";
import { StoresProvider } from "./store/StoresProvider";
import { GameBoundary } from "./features/gameBoundary/GameBoundary";
import { GameSceneWithContextBridge } from "./features/gameScene/gameScene";
import "@babylonjs/loaders";

export default function RouletteGame() {
  return (
    <GameBoundary fallback={null}>
      <StoresProvider>
        <HUD />
        <Suspense fallback={<div>loading</div>}>
          <Engine
            height={"100%"}
            antialias={true}
            adaptToDeviceRatio
            canvasId="canvas"
          >
            <GameSceneWithContextBridge />
          </Engine>
        </Suspense>
      </StoresProvider>
    </GameBoundary>
  );
}
