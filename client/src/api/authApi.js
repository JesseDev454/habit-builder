import api from "./axios";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

export const registerUser = async (formData) => {
  try {
    const response = await api.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await api.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
