import { FC, useState } from "react";
import { SchedulerSettings } from "../../types/SchedulerSettings";

interface Props {
  reset: () => void;
  id: number;
}

const NotificationSettingsModal: FC<Props> = ({ reset, id }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<SchedulerSettings>();

  return <></>;
};

export default NotificationSettingsModal;
