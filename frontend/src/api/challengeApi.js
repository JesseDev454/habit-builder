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

export const seedDefaultChallenges = () => request(api.post("/challenges/seed"));

export const getChallenges = () => request(api.get("/challenges"));

export const getMyChallenges = () => request(api.get("/challenges/my-challenges"));

export const joinChallenge = (id) => request(api.post(`/challenges/${id}/join`));

export const getChallengesApi = getChallenges;
