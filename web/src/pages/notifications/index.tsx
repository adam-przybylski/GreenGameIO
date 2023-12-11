import { FC, useLayoutEffect, useState } from "react";
import { api } from "../../api/api.config";
import { Notification } from "../../types/Notification";
import NotificationModal from "../../components/modals/NotificationModal";
import Button from "../../components/Button";

const Notifications: FC = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [notificationToEdit, setNotificationToEdit] = useState<Notification>();

  const getNotifications = () => {
    api.get("/notifications").then((res) => {
      setData(res.data);
    });
  };

  useLayoutEffect(() => getNotifications());

  return (
    <>
      <div className="flex justify-between font-bold">
        <div className="basis-2/12 text-center">ID</div>
        <div className="basis-3/12 text-center">TYTUŁ</div>
        <div className="basis-full text-center">OPIS</div>
        <div className="basis-2/12 text-center">AKCJE</div>
      </div>
      <div>
        {data
          .sort((not1, not2) => not1.id - not2.id)
          .map((not) => (
            <div key={not.id} className="flex justify-between">
              <div className="basis-2/12 text-center">{not.id}</div>
              <div className="basis-3/12 text-center">{not.title}</div>
              <div className="basis-full">{not.content}</div>
              <div className="basis-2/12 text-center">
                <Button
                  label="Edit"
                  onClick={() => setNotificationToEdit(not)}
                />
              </div>
            </div>
          ))}
        {notificationToEdit && (
          <NotificationModal
            notification={notificationToEdit}
            reset={() => {
              setNotificationToEdit(undefined);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Notifications;
