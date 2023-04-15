import React from "react";
import { Suspense } from "react";
const RouletteGameLazy = React.lazy(() => import("../../roulette"));

export function RoulettePage() {
  return (
    <div className="relative m-8 flex flex-grow">
      <Suspense fallback="loading the game...">
        <RouletteGameLazy />
      </Suspense>
    </div>
  );
}
