import { Vector3 } from "@babylonjs/core";
import { Engine, Scene, useClick } from "react-babylonjs";

import "@babylonjs/core/Loading/loadingScreen";
import { Suspense } from "react";

export function RouletteGame() {
  return (
    <Engine antialias={true} adaptToDeviceRatio canvasId="canvas">
      <Scene>
        <Game />
      </Scene>
    </Engine>
  );
}

export function Game() {
  return (
    <Suspense fallback={null}>
      <followCamera
        name="camera1"
        position={new Vector3(2, 6, -2)}
        setTarget={[new Vector3(2, 1, 0)]}
      />

      <pointLight
        name="light1"
        position={new Vector3(0, 6, -3)}
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
    </Suspense>
  );
}
