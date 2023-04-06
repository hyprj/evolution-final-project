import { Suspense } from "react";
import { RouletteGameLazy } from "../../roulette/RouletteGame";

export function RoulettePage() {
  return (
    <div className="relative m-8 flex flex-grow">
      <Suspense fallback="loading the game...">
        <RouletteGameLazy />
      </Suspense>
    </div>
  );
}
