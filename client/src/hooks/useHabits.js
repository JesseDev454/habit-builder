import { useCallback, useEffect, useState } from "react";
import {
  archiveHabit as archiveHabitApi,
  completeHabit,
  createHabit,
  getHabits,
  getTodayHabits,
  updateHabit,
} from "../api/habitApi";

const useHabits = ({ today = false, autoFetch = true } = {}) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState(null);

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getHabits();
      setHabits(data.habits || []);
      return data.habits || [];
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTodayHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTodayHabits();
      setHabits(data.habits || []);
      return data.habits || [];
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoFetch) return;
    const load = today ? fetchTodayHabits : fetchHabits;
    load().catch(() => {});
  }, [autoFetch, fetchHabits, fetchTodayHabits, today]);

  const addHabit = async (payload) => {
    const data = await createHabit(payload);
    setHabits((current) => [data.habit, ...current]);
    return data.habit;
  };

  const editHabit = async (id, payload) => {
    const data = await updateHabit(id, payload);
    setHabits((current) => current.map((habit) => (habit._id === id ? data.habit : habit)));
    return data.habit;
  };

  const removeHabit = async (id) => {
    const data = await archiveHabitApi(id);
    setHabits((current) => current.filter((habit) => habit._id !== id));
    return data;
  };

  const markHabitComplete = async (id) => {
    try {
      setCompletingId(id);
      const data = await completeHabit(id);
      setHabits((current) =>
        current.map((habit) =>
          habit._id === id
            ? {
                ...habit,
                ...data.habit,
                completedToday: true,
                completedAt: data.log?.completedAt,
              }
            : habit
        )
      );
      return data;
    } finally {
      setCompletingId(null);
    }
  };

  return {
    habits,
    loading,
    error,
    completingId,
    completedToday: habits.filter((habit) => habit.completedToday).length,
    totalToday: habits.length,
    fetchHabits,
    fetchTodayHabits,
    addHabit,
    editHabit,
    archiveHabit: removeHabit,
    removeHabit,
    markHabitComplete,
  };
};

export default useHabits;
