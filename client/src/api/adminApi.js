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

export const getAdminStats = () => request(api.get("/admin/stats"));

export const getAdminApi = getAdminStats;
