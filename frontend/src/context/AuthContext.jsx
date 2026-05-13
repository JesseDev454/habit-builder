// Auth context:
// gives the whole frontend access to the current user, token, and auth actions.
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Keep auth state in memory, but also restore the token from localStorage on refresh.
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("habitquest_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On first load, try to restore the previous session from localStorage.
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

  // Save token + user after login/register so the rest of the app can use them immediately.
  const persistSession = useCallback((data) => {
    localStorage.setItem("habitquest_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (formData) => {
    const data = await registerUser(formData);
    return persistSession(data);
  }, [persistSession]);

  const login = useCallback(async (formData) => {
    const data = await loginUser(formData);
    return persistSession(data);
  }, [persistSession]);

  const logout = useCallback(() => {
    localStorage.removeItem("habitquest_token");
    setToken(null);
    setUser(null);
  }, []);

  // Used after profile-changing actions so the UI can refresh the signed-in user.
  const refreshUser = useCallback(async () => {
    if (!localStorage.getItem("habitquest_token")) return null;
    const data = await getCurrentUser();
    setUser(data.user);
    return data.user;
  }, []);

  const updateUser = useCallback((nextUser) => {
    setUser((currentUser) => ({ ...currentUser, ...nextUser }));
  }, []);

  // Memoize the context value so children do not re-render more than necessary.
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
