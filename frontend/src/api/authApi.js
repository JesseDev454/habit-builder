// Auth API helpers:
// small wrappers that keep auth requests and error handling consistent.
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

// Login returns both the user object and the JWT token.
export const loginUser = async (formData) => {
  try {
    const response = await api.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

// Used on refresh to rebuild the signed-in session from the saved token.
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
