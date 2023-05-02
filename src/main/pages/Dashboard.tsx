import { observer } from "mobx-react";
import { Button } from "../components/button/Button";
import { authStore } from "../features/auth/store";

export const Dashboard = observer(() => {
  const { user, addToBalance } = authStore;
  return (
    <div className="flex flex-grow items-start justify-center">
      <div className="m-4 mt-20 flex w-full max-w-7xl flex-col  justify-center gap-4 lg:flex-row">
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
  return (
    <div className="basis-full rounded-xl  bg-zinc-100 p-4">{children}</div>
  );
}
