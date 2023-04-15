import { Vector3 } from "@babylonjs/core";
import { Engine, Model, Scene } from "react-babylonjs";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders";
import { Suspense } from "react";
import { HUD } from "./features/hud/HUD";
import { StoreProvider } from "./store/StoreProvider";

export default function RouletteGame() {
  return (
    <StoreProvider>
      <HUD />
      <Engine
        height={"100%"}
        antialias={true}
        adaptToDeviceRatio
        canvasId="canvas"
      >
        <Scene>
          <Game />
        </Scene>
      </Engine>
    </StoreProvider>
  );
}

export function Game() {
  return (
    <>
      <followCamera
        name="camera1"
        position={new Vector3(2, 12, -2)}
        setTarget={[new Vector3(2, 1, 0)]}
      />
      <Suspense fallback={null}>
        <Model
          scaleToDimension={5}
          name="wheel"
          rootUrl="../../../public/wheel/"
          sceneFilename="unti222tled.gltf"
        />
      </Suspense>

      <pointLight
        name="light1"
        position={new Vector3(0, 10, -3)}
        intensity={0.7}
        shadowAngle={Math.PI * 2}
        direction={new Vector3(0, 0, 0)}
      />
      <ground name="ground" width={24} height={24}>
        <standardMaterial name="table-green">
          <texture
            url="../../../public/green-fabric/diffuse.jpg"
            assignTo="diffuseTexture"
          />
        </standardMaterial>
      </ground>
    </>
  );
}
