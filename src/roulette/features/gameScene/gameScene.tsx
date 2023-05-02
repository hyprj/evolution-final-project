import { Color3, Vector3 } from "@babylonjs/core";
import { Scene } from "react-babylonjs";
import {
  useRootStore,
  useUIStore,
  RootStoreContext,
  UIStoreContext,
} from "@roulette/store/StoresProvider";
import { Camera } from "../camera/Camera";
import { Wheel } from "../wheel/Wheel";
import { Ball } from "../ball/Ball";

export function GameSceneWithContextBridge() {
  const rootStore = useRootStore();
  const uiStore = useUIStore();

  return (
    <Scene>
      <RootStoreContext.Provider value={rootStore}>
        <UIStoreContext.Provider value={uiStore}>
          <Camera />
          <hemisphericLight
            name="dl"
            intensity={1.5}
            direction={new Vector3(0, 0, 0)}
          >
            <spotLight
              name="light1"
              angle={Math.PI}
              diffuse={new Color3(200, 50, 50)}
              specular={new Color3(255, 200, 200)}
              exponent={Math.PI * 5}
              position={new Vector3(1, 7, 1)}
              intensity={2}
              direction={
                new Vector3((-5 * Math.PI) / 4, (-5 * Math.PI) / 4, -Math.PI)
              }
            >
              <shadowGenerator
                mapSize={128}
                useBlurExponentialShadowMap
                blurKernel={64}
                shadowCastChildren
              >
                <Wheel />
                <Ball />

                <ground name="ground" width={128} height={128}>
                  <standardMaterial name="table-green">
                    <texture
                      vScale={16}
                      uScale={16}
                      url="../../../green-fabric/diffuse.jpg"
                      assignTo="diffuseTexture"
                    />
                  </standardMaterial>
                </ground>
              </shadowGenerator>
            </spotLight>
          </hemisphericLight>
        </UIStoreContext.Provider>
      </RootStoreContext.Provider>
    </Scene>
  );
}
