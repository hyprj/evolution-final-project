import { useUIStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";

export const UnavaibleBet = observer(() => {
  const { betNotifications } = useUIStore();

  if (betNotifications.notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification ">
      {betNotifications.notifications.map((notification) => (
        <p key={Math.random()} className="notification--bet">
          {notification}
        </p>
      ))}
    </div>
  );
});
