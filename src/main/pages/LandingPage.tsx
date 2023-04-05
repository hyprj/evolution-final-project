import { Link } from "react-router-dom";
import { Button } from "../components/button/Button";

export function LandingPage() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-orange-50">
      <div className="flex flex-col items-center  gap-14 text-center font-semibold">
        <p className="text-5xl">
          Welcome to <span className="text-green-900">Game Hub</span>,
          <br />
          the ultimate gaming destination.
        </p>
        <p className="max-w-xl">
          With our user-friendly authentication system, it's easy to create an
          account and start playing right away. Once you're logged in, you'll
          have access to a variety of games, including our thrilling roulette
          game, where you can test your luck and win big.
        </p>
        <Button bgColor="green" size="lg">
          <Link to="/register">Register now</Link>
        </Button>
        <Button bgColor="yellow" size="lg">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </main>
  );
}
