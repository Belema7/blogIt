import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../url";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Server returned invalid response");
    }

    if (!res.ok) {
      throw new Error(data?.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    setUser({
      id: data.id,
      username: data.username,
      email: data.email
    });
  };

  const register = async (username, email, password) => {
    const res = await fetch(`${URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Server returned invalid response");
    }

    if (!res.ok) {
      throw new Error(data?.message || "Registration failed");
    }

    localStorage.setItem("token", data.token);
    setUser({
      id: data.id,
      username: data.username,
      email: data.email
    });
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${URL}/api/users/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
