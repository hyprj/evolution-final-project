import { observer } from "mobx-react";
import { Button } from "../components/button/Button";
import { authStore } from "../features/auth/store";

export const Dashboard = observer(() => {
  const { user, addToBalance } = authStore;
  return (
    <div className="flex flex-grow items-start justify-center">
      <div className="max-md:grid-cols-1 m-4 mt-20 grid grid-cols-2 gap-3">
        <DashboardItem>
          <h4 className="text-4xl font-semibold">
            {user?.displayName || "Name not specified"}
          </h4>
          <p>{user?.email}</p>
        </DashboardItem>
        <DashboardItem>
          <h4 className="text-4xl font-semibold">Balance</h4>
          <p>{`amount: ${user?.balance}$`}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button bgColor="green" size="lg" onClick={() => addToBalance(10)}>
              Add 10$
            </Button>
            <Button bgColor="red" size="lg" onClick={() => addToBalance(20)}>
              Add 20$
            </Button>
            <Button bgColor="yellow" size="lg" onClick={() => addToBalance(50)}>
              Add 50$
            </Button>
            <Button bgColor="blue" size="lg" onClick={() => addToBalance(100)}>
              Add 100$
            </Button>
          </div>
        </DashboardItem>
      </div>
    </div>
  );
});

export function DashboardItem({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl  bg-zinc-100 p-4">{children}</div>;
}
