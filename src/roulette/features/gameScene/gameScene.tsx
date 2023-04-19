import { Vector3 } from "@babylonjs/core";
import { Suspense } from "react";
import { Model, Scene } from "react-babylonjs";
import {
  useRootStore,
  useUIStore,
  RootStoreContext,
  UIStoreContext,
} from "@roulette/store/StoresProvider";
import { Camera } from "../camera/Camera";

export function GameSceneWithContextBridge() {
  const rootStore = useRootStore();
  const uiStore = useUIStore();

  return (
    <Scene>
      <RootStoreContext.Provider value={rootStore}>
        <UIStoreContext.Provider value={uiStore}>
          <Camera />
          <Suspense fallback={null}>
            <Model
              position={new Vector3(0, 0, 0)}
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
        </UIStoreContext.Provider>
      </RootStoreContext.Provider>
    </Scene>
  );
}
