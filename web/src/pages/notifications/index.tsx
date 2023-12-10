import { FC } from "react";
import { useNotifications } from "../../data/useNotifications";

const Notifications: FC = () => {
  const notifications = useNotifications();

  console.log(notifications);
  return (
    <>
      <div></div>
    </>
  );
};

export default Notifications;
