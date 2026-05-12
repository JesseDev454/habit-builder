import { createContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("habitquest_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const storedToken = localStorage.getItem("habitquest_token");

      if (!storedToken) {
        setToken(null);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setToken(storedToken);
        const data = await getCurrentUser();
        setUser(data.user);
      } catch {
        localStorage.removeItem("habitquest_token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const persistSession = (data) => {
    localStorage.setItem("habitquest_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (formData) => {
    const data = await registerUser(formData);
    return persistSession(data);
  };

  const login = async (formData) => {
    const data = await loginUser(formData);
    return persistSession(data);
  };

  const logout = () => {
    localStorage.removeItem("habitquest_token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!localStorage.getItem("habitquest_token")) return null;
    const data = await getCurrentUser();
    setUser(data.user);
    return data.user;
  };

  const updateUser = (nextUser) => {
    setUser((currentUser) => ({ ...currentUser, ...nextUser }));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      register,
      login,
      logout,
      refreshUser,
      updateUser,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
