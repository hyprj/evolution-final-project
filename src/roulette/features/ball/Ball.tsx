import { Vector3 } from "@babylonjs/core";
import { useUIStore } from "@roulette/store/StoresProvider";
import { NumericField } from "@roulette/utils/types";
import { observer } from "mobx-react";
import { Suspense } from "react";
import { Model, useScene } from "react-babylonjs";

const WHEEL_NUMBERS_AMOUNT = 37;
const ANGLE_BETWEEN_WHEEL_NUMBERS = (2 * Math.PI) / WHEEL_NUMBERS_AMOUNT;

const WHEEL_NUMBERS_ORDER: NumericField[] = [
  11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35,
  3, 26, 0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
];

export const Ball = observer(() => {
  const { wheelStore } = useUIStore();
  const scene = useScene();

  const onModelLoaded = () => {
    const spinAnimation = scene?.getAnimationGroupByName("SphereAction");
    spinAnimation?.stop();
    wheelStore.ballAnimation = spinAnimation;
  };

  const position = wheelStore.resultAnimationNumber
    ? new Vector3(0, 1, 0)
    : new Vector3(0, -2, 0);

  const rotation = wheelStore.resultAnimationNumber
    ? new Vector3(
        0,
        ANGLE_BETWEEN_WHEEL_NUMBERS *
          WHEEL_NUMBERS_ORDER.indexOf(wheelStore.resultAnimationNumber),
        0
      )
    : Vector3.Zero();

  return (
    <Suspense>
      <Model
        position={position}
        rotation={rotation}
        scaleToDimension={2}
        name="ball"
        rootUrl="../../../"
        sceneFilename="wheel-animated.gltf"
        onModelLoaded={onModelLoaded}
      />
    </Suspense>
  );
});
