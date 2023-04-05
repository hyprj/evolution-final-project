import { Link } from "react-router-dom";

export function GamesPage() {
  return (
    <div className="m-8">
      <h4 className="mb-8 text-3xl font-semibold">Browse games</h4>
      <ul>
        <GameCard />
      </ul>
    </div>
  );
}

export function GameCard() {
  return (
    <Link to="roulette">
      <li className="flex h-64 w-64 flex-col transition-transform duration-100 hover:scale-105">
        <div className="flex-grow rounded-t-lg bg-[url('/roulette-card.png')] object-fill" />
        <div className="flex h-11 items-center rounded-b-lg bg-red-300 pl-4">
          <p className="text-2xl font-semibold">Roulette</p>
        </div>
      </li>
    </Link>
  );
}
