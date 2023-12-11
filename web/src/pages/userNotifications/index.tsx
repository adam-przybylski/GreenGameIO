import { FC, useEffect, useState } from "react";
import { api } from "../../api/api.config";
import { UserNotification } from "../../types/UserNotification";
import Button from "../../components/Button";

const UserNotifications: FC = () => {
  const [data, setData] = useState<UserNotification[]>([]);

  const handleGet = () => {
    api.get("/user/notifications").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div>
      <Button label="ClickMe!" onClick={() => console.log(data)}></Button>
    </div>
  );
};

export default UserNotifications;
