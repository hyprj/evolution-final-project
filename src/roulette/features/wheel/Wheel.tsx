import { Vector3 } from "@babylonjs/core";
import { useUIStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";
import { Suspense } from "react";
import { Model, useScene } from "react-babylonjs";

export const Wheel = observer(() => {
  const { wheelStore } = useUIStore();
  const scene = useScene();

  const onModelLoaded = () => {
    const spinAnimation = scene?.getAnimationGroupByName("Animation");
    spinAnimation?.stop();
    wheelStore.spinAnimation = spinAnimation;
  };

  return (
    <Suspense>
      <Model
        position={new Vector3(0, 1, 0)}
        scaleToDimension={5}
        name="wheel"
        rootUrl="../../../public/"
        sceneFilename="wheel.gltf"
        onModelLoaded={onModelLoaded}
      />
    </Suspense>
  );
});
