import api from "./axios";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const request = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getNotifications = () => request(api.get("/notifications"));

export const markNotificationRead = (id) => request(api.patch(`/notifications/${id}/read`));

export const markAllNotificationsRead = () => request(api.patch("/notifications/read-all"));

export const getNotificationsApi = getNotifications;
