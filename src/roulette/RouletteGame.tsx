import { Vector3 } from "@babylonjs/core";
import { Engine, Model, Scene, useClick } from "react-babylonjs";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders";
import { Suspense, lazy } from "react";
import { HUD } from "./features/hud/HUD";

export const RouletteGameLazy = lazy(() => import("./RouletteGame"));

export default function RouletteGame() {
  return (
    <div>
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
    </div>
  );
}

export function Game() {
  return (
    <>
      <followCamera
        name="camera1"
        position={new Vector3(2, 6, -2)}
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
