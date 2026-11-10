import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { token, logout } = useUser();
  const { total } = useCart();

  return (
    <>
      <div className="tricolore-bar"></div>
      <nav className="navbar navbar-expand-lg navbar-dark italian-navbar px-4 py-3">
        <div className="container">
          <Link className="navbar-brand italian-brand" to="/">
            🍕 Mamma <span>Mía</span>
          </Link>
          <div className="d-flex align-items-center gap-2">
            <Link className="btn btn-outline-light me-2" to="/">
              🏠 Home
            </Link>
            {token ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/profile">
                  👤 Perfil
                </Link>
                <button className="btn btn-italian-red me-2" onClick={logout}>
                  🔒 Salir
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  🔑 Entrar
                </Link>
                <Link className="btn btn-italian-green me-2" to="/register">
                  ✏️ Registro
                </Link>
              </>
            )}
            <Link className="btn btn-italian-green ms-3" to="/cart">
              🛒 Total: ${total.toLocaleString("es-CL")}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};