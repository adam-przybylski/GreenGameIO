import { Notification } from "./Notification";

export interface UserNotification extends Notification {
  sended: boolean;
  userId: number;
}
