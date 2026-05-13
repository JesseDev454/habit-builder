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

export const seedDefaultBadges = () => request(api.post("/badges/seed"));

export const getAllBadges = () => request(api.get("/badges"));

export const getMyBadges = () => request(api.get("/badges/my-badges"));

export const getBadgeProgress = () => request(api.get("/badges/progress"));

export const getBadgesApi = getAllBadges;
