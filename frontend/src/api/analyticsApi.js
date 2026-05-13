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

export const getAnalyticsSummary = () => request(api.get("/analytics/summary"));

export const getDashboardAnalytics = () => request(api.get("/analytics/dashboard"));

export const getCategoryAnalytics = () => request(api.get("/analytics/categories"));

export const getCategoryDetailAnalytics = (category) => request(api.get(`/analytics/categories/${category}`));

export const getWeeklyAnalytics = () => request(api.get("/analytics/weekly"));

export const getHeatmapData = (days = 90) => request(api.get("/analytics/heatmap", { params: { days } }));

export const getHabitStats = (id) => request(api.get(`/analytics/habits/${id}`));

export const getAnalyticsApi = getAnalyticsSummary;
