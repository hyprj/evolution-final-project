import { Button } from "../components/button/Button";
import { authStore } from "../features/auth/store";

export function Dashboard() {
  const { user } = authStore;
  return (
    <div className="flex flex-grow items-start justify-center">
      <div className="m-4 mt-20 grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <DashboardItem>
          <h4 className="text-4xl font-semibold">
            {user?.displayName || "Name not specified"}
          </h4>
          <p>{user?.email}</p>
        </DashboardItem>
        <DashboardItem>
          <h4 className="text-4xl font-semibold">Balance</h4>
          <p>amount: 100$</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button bgColor="green" size="lg">
              Add 10$
            </Button>
            <Button bgColor="red" size="lg">
              Add 20$
            </Button>
            <Button bgColor="yellow" size="lg">
              Add 50$
            </Button>
            <Button bgColor="blue" size="lg">
              Add 100$
            </Button>
          </div>
        </DashboardItem>
      </div>
    </div>
  );
}

export function DashboardItem({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl  bg-zinc-100 p-4">{children}</div>;
}
