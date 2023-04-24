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
import { Wheel } from "../wheel/Wheel";

export function GameSceneWithContextBridge() {
  const rootStore = useRootStore();
  const uiStore = useUIStore();

  return (
    <Scene>
      <RootStoreContext.Provider value={rootStore}>
        <UIStoreContext.Provider value={uiStore}>
          <Camera />
          {/* <Suspense fallback={null}> */}
          <Wheel />
          {/* <Model
              position={new Vector3(0, 1, 0)}
              scaleToDimension={5}
              name="wheel"
              rootUrl="../../../public/"
              sceneFilename="wheel.gltf"
            />
          </Suspense> */}

          <pointLight
            name="light1"
            position={new Vector3(0, 10, -3)}
            intensity={100}
            shadowAngle={Math.PI * 2}
            direction={new Vector3(-5, 0, 0)}
          />
          <ground name="ground" width={64} height={64}>
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
