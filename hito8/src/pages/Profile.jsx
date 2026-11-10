import { useEffect } from "react";
import { useUser } from "../context/UserContext";

export const Profile = () => {
  const { email, logout, getProfile } = useUser();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h2>Perfil de Usuario</h2>
      <p className="mt-3 fs-4">
        <strong>Email actual:</strong> {email || "Cargando..."}
      </p>
      <button className="btn btn-danger mt-3" onClick={logout}>
        Cerrar Sesión
      </button>
    </div>
  );
};