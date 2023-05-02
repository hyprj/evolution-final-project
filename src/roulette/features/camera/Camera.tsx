import { Axis, FreeCamera, Quaternion, Vector3 } from "@babylonjs/core";
import { useUIStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { useBeforeRender } from "react-babylonjs";

export const Camera = observer(() => {
  const cameraRef = useRef<FreeCamera | null>(null);
  const { wheelStore } = useUIStore();

  useBeforeRender(() => {
    if (wheelStore.wheelPhase !== "spinning" && cameraRef.current?.position) {
      const rotQuart = Quaternion.RotationAxis(Axis.Y, 0.001);
      cameraRef.current.position.rotateByQuaternionAroundPointToRef(
        rotQuart,
        Vector3.Zero(),
        cameraRef.current.position
      );
      cameraRef.current.target = Vector3.Zero();
    }
  });

  useEffect(() => {
    if (cameraRef.current) wheelStore.registerCamera(cameraRef.current);
  }, []);

  return (
    <freeCamera
      ref={cameraRef}
      name="camera1"
      position={new Vector3(0, 3, 5)}
      setTarget={[Vector3.Zero()]}
    />
  );
});
