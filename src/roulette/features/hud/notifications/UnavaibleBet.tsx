import { useUIStore } from "@roulette/store/StoresProvider";
import { observer } from "mobx-react";

export const UnavaibleBet = observer(() => {
  const { notificationStore } = useUIStore();

  if (notificationStore.notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification ">
      {notificationStore.notifications.map((notification) => (
        <p key={Math.random()} className="notification--bet">
          {notification}
        </p>
      ))}
    </div>
  );
});
