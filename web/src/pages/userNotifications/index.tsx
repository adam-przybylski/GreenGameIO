import { FC, useEffect, useState } from "react";
import { api } from "../../api/api.config";
import { UserNotification } from "../../types/UserNotification";
import Button from "../../components/Button";
import NotificationPreferencesModal from "../../components/modals/NotificationPreferencesModal";

const UserNotifications: FC = () => {
  const [data, setData] = useState<UserNotification[]>([]);
  const [showEditPreferences, setShowEditPreferences] =
    useState<boolean>(false);

  const handleGet = () => {
    api.get("/user/notifications").then((res) => {
      setData(res.data);
    });
  };

  const handleRemove = (notification: UserNotification) => {
    api
      .delete(`/user/notifications/${notification.id}`)
      .then(() => {
        handleGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closePreferencesModal = () => {
    setShowEditPreferences(false);
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <>
      <div className="flex justify-center m-3">
        <Button
          label="Edytuj preferencje powiadomień"
          onClick={() => setShowEditPreferences(true)}
          className="bg-green-200 p-1 rounded text-black  mr-1 hover:text-white ease-in-out duration-100"
        />
      </div>
      <div className="flex justify-between font-bold p-2 bg-nice-green rounded-t-sm text-black">
        <div className="basis-3/12 text-center">TYTUŁ</div>
        <div className="basis-full text-center">OPIS</div>
        <div className="basis-2/12 text-center">AKCJE</div>
      </div>
      <div className="rounded-b-sm bg-white">
        {data.length ? (
          data
            .sort((not1, not2) => not1.id - not2.id)
            .map((not) => (
              <div
                key={not.id}
                className="flex justify-between text-black p-2 even:bg-slate-100"
              >
                <div className="basis-3/12 flex justify-center items-center">
                  {not.title}
                </div>
                <div className="basis-full flex items-center break-keep">
                  {not.content}
                </div>
                <div className="basis-2/12 flex justify-center items-center text-center">
                  <Button
                    label="X"
                    onClick={() => {
                      handleRemove(not);
                    }}
                    className=" px-2 bg-red-200 p-1 rounded text-black hover:text-white ease-in-out duration-100"
                  ></Button>
                </div>
              </div>
            ))
        ) : (
          <div className="text-black flex justify-center text-3xl p-3 font-bold">
            Nie masz powiadomień
          </div>
        )}
      </div>
      {showEditPreferences && (
        <NotificationPreferencesModal reset={closePreferencesModal} />
      )}
    </>
  );
};

export default UserNotifications;
