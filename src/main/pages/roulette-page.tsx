import React from "react";
import { Suspense } from "react";
const RouletteGameLazy = React.lazy(() => import("../../roulette"));

export function RoulettePage() {
  return (
    <div className="absolute h-full w-full">
      {/* <div className="relative h-full w-full"> */}
      <Suspense fallback="loading the game...">
        <RouletteGameLazy />
      </Suspense>
      {/* </div> */}
    </div>
  );
}
