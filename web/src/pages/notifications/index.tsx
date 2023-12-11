import { FC, useLayoutEffect, useState } from "react";
import { api } from "../../api/api.config";
import { Notification } from "../../types/Notification";
import NotificationModal from "../../components/modals/NotificationModal";
import Button from "../../components/Button";

const Notifications: FC = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [notificationToEdit, setNotificationToEdit] = useState<Notification>();
  const [notificationToAdd, setNotificationToAdd] = useState<boolean>(false);

  const getNotifications = () => {
    api.get("/notifications").then((res) => {
      setData(res.data);
    });
  };

  useLayoutEffect(() => getNotifications());

  const handleEdit = (notificaiton: Notification) => {
    api.put("/notifications", notificaiton).catch((error) => {
      console.log(error);
    });
  };

  const handleAdd = (notificaiton: Notification) => {
    api.post("/notifications", notificaiton).catch((error) => {
      console.log(error);
    });
  };

  const handleRemove = (notificaiton: Notification) => {
    api.delete(`/notifications/${notificaiton.id}`).catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <div className="flex justify-center mb-3">
        <Button
          label="Dodaj"
          onClick={() => setNotificationToAdd(true)}
          className="bg-green-200 p-1 rounded text-black  mr-1 hover:text-white ease-in-out duration-100"
        />
      </div>
      {notificationToAdd && (
        <NotificationModal
          notification={undefined}
          displayText="Dodaj"
          handleExecute={handleAdd}
          reset={() => {
            setNotificationToAdd(false);
          }}
        />
      )}
      <div className="flex justify-between font-bold p-2 bg-nice-green rounded-t-sm text-black">
        <div className="basis-1/12 text-center">ID</div>
        <div className="basis-3/12 text-center">TYTUŁ</div>
        <div className="basis-full text-center">OPIS</div>
        <div className="basis-2/12 text-center">AKCJE</div>
      </div>
      <div className="rounded-b-sm bg-white">
        {data
          .sort((not1, not2) => not1.id - not2.id)
          .map((not) => (
            <div
              key={not.id}
              className="flex justify-between text-black p-2 even:bg-slate-100"
            >
              <div className="basis-1/12 flex justify-center items-center">
                {not.id}
              </div>
              <div className="basis-3/12 flex justify-center items-center">
                {not.title}
              </div>
              <div className="basis-full flex items-center break-keep">
                {not.content}
              </div>
              <div className="basis-2/12 flex justify-center items-center text-center">
                <Button
                  label="Modyfikuj"
                  onClick={() => setNotificationToEdit(not)}
                  className="bg-green-200 p-1 rounded text-black  mr-1 hover:text-white ease-in-out duration-100"
                />
                <Button
                  label="Usuń"
                  onClick={() => handleRemove(not)}
                  className="bg-red-200 p-1 rounded text-black hover:text-white ease-in-out duration-100"
                />
              </div>
            </div>
          ))}
        {notificationToEdit && (
          <NotificationModal
            notification={notificationToEdit}
            displayText="Edytuj"
            handleExecute={handleEdit}
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
