import api from "./axios";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

export const getUserApi = () => api.get("/users");

export const updateUserGoals = async (selectedGoals) => {
  try {
    const response = await api.patch("/users/goals", { selectedGoals });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
