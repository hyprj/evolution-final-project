import { useEffect, useState } from "react";

export function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationType>(
    window.screen.orientation.type
  );

  const isPortrait =
    orientation === "portrait-primary" || orientation === "portrait-secondary";

  useEffect(() => {
    const onOrientationChange = () => {
      setOrientation(window.screen.orientation.type);
    };

    window.addEventListener("orientationchange", onOrientationChange);

    return () =>
      window.removeEventListener("orientationchange", onOrientationChange);
  }, []);

  return { orientation, isPortrait };
}
