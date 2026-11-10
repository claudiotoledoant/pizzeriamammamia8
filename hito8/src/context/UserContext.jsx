import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // Requerimiento 1: Login
  const login = async (emailInput, passwordInput) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        return { success: true };
      } else {
        return { success: false, message: data.error || "Error al iniciar sesión" };
      }
    } catch (error) {
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  // Requerimiento 1: Register
  const register = async (emailInput, passwordInput) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        return { success: true };
      } else {
        return { success: false, message: data.error || "Error al registrarse" };
      }
    } catch (error) {
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  // Requerimiento 2: Logout
  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  // Requerimiento 3: Obtener Perfil me (/api/auth/me)
  const getProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setEmail(data.email);
        return data;
      }
    } catch (error) {
      console.error("Error en getProfile:", error);
    }
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);