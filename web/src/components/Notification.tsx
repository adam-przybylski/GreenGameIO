import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserNotification } from "../types/UserNotification";
import { api } from "../api/api.config";
import { useNavigate } from "react-router-dom";

const Notification: FC = () => {
  const [data, setData] = useState<UserNotification[]>([]);
  const navigation = useNavigate();

  const handleGet = () => {
    api
      .get("/user/notifications/newest")
      .then((res) => {
        setData(res.data);
      })
      .finally(notify);
  };

  const notify = () => {
    if (data.length == 0) {
      return;
    }
    data.map((notifiaction) => {
      toast.custom(() => (
        <div
          className="hover:cursor-pointer"
          onClick={() => navigation("/user/notifications")}
        >
          <div className="flex flex-row bg-white rounded-md shadow-sm">
            <div className="mx-1 flex align-middle justify-center self-center text-2xl p-2">
              🔔
            </div>
            <div className="basis-full text-black pr-2 pt-2 pb-2 ">
              <div className="font-bold">{notifiaction.title}</div>
              <div>{notifiaction.content}</div>
            </div>
          </div>
        </div>
      ));
    });
  };

  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    notify();
  }, [data]);

  return (
    <div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Notification;
