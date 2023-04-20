import { FreeCamera, Vector3 } from "@babylonjs/core";
import { useUIStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";
import { useRef } from "react";

export const Camera = observer(() => {
  const cameraRef = useRef<FreeCamera | null>(null);
  const { wheelStore } = useUIStore();

  if (cameraRef.current) {
    cameraRef.current.position = wheelStore.cameraPos;
  }

  return (
    <freeCamera
      ref={cameraRef}
      name="camera1"
      position={new Vector3(0, 3, 5)}
      setTarget={[Vector3.Zero()]}
    />
  );
});
