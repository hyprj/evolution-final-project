export function LandingPage() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-orange-50">
      <div className="flex flex-col  items-center gap-14 font-semibold">
        <p className="text-5xl">
          Welcome to <span className="italic text-green-900">Game Hub</span>,
          <br />
          the ultimate gaming destination.
        </p>
        <p className="max-w-xl">
          With our user-friendly authentication system, it's easy to create an
          account and start playing right away. Once you're logged in, you'll
          have access to a variety of games, including our thrilling roulette
          game, where you can test your luck and win big.
        </p>
        <button>join</button>
        <p className="max-w-xl">
          If you're in the mood for some classic gaming action, try our
          Mario-like 2D platformer. With its challenging levels and nostalgic
          graphics, it's sure to keep you entertained for hours.
        </p>
        <div>
          <p>Already a member? </p>
          <button>Login</button>
        </div>
      </div>
    </main>
  );
}
