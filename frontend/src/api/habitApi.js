// Habit API helpers:
// this file is the frontend's single place for habit CRUD + completion calls.
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

// Create and editing flows.
export const createHabit = (data) => request(api.post("/habits", data));

export const createManyHabits = (habits) => request(api.post("/habits/bulk", { habits }));

export const getHabits = (params = {}) => request(api.get("/habits", { params }));

export const getTodayHabits = () => request(api.get("/habits/today"));

export const getHabitById = (id) => request(api.get(`/habits/${id}`));

export const updateHabit = (id, data) => request(api.put(`/habits/${id}`, data));

// Archive/complete are state-changing actions used heavily throughout the app.
export const archiveHabit = (id) => request(api.patch(`/habits/${id}/archive`));

export const completeHabit = (id) => request(api.post(`/habits/${id}/complete`));

export const getHabitLogs = (id, params = {}) => request(api.get(`/habits/${id}/logs`, { params }));
