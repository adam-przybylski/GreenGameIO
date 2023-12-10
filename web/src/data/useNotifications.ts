import axios from "axios";

export const useNotifications = () => {
  return axios.get(`/api/v1/notifications`);
};
