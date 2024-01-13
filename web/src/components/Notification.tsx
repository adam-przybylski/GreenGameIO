import { FC, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserNotification } from "../types/UserNotification";
import { api } from "../api/api.config";

const Notification: FC = () => {
  const [data, setData] = useState<UserNotification[]>([]);
  const handleGet = () => {
    api
      .get("/user/notifications/newest")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .finally(notify);
  };

  const notify = () => {
    if (data.length == 0) {
      return;
    }
    console.log(data);
    data.map((notifiaction) => {
      toast(notifiaction.title + "\n\n" + notifiaction.content, {
        icon: "🔔",
      });
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
