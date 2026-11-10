// src/pages/Cart.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export const Cart = () => {
  const { cart, total, clearCart } = useCart();
  const { token } = useUser();
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      if (response.ok) {
        setSuccessMsg(true);
        clearCart();
      } else {
        alert("Ocurrió un error al procesar la compra.");
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      alert("Error de conexión al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "650px" }}>
      <div className="italian-card p-4">
        <h2 className="text-center mb-4 text-danger">🛒 Il Tuo Carrello</h2>

        {successMsg && (
          <div className="alert alert-success text-center" role="alert">
            🎉 <strong>¡Grazie mille!</strong> Tu pedido ha sido procesado con éxito.
          </div>
        )}

        {cart.length === 0 && !successMsg ? (
          <p className="text-center text-muted my-4">El carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <div>
                <h5 className="mb-0">{item.name}</h5>
                <small className="text-muted">Cantidad: {item.count}</small>
              </div>
              <span className="fw-bold">${(item.price * item.count).toLocaleString("es-CL")}</span>
            </div>
          ))
        )}

        <h4 className="mt-4 text-end">
          Total: <span className="text-success">${total.toLocaleString("es-CL")}</span>
        </h4>

        <button
          className="btn btn-italian-green mt-3 w-100 py-2 fs-5"
          disabled={!token || cart.length === 0 || loading}
          onClick={handleCheckout}
        >
          {loading ? "Procesando compra..." : "Pagar con estilo Mamma Mía 🍕"}
        </button>

        {!token && (
          <div className="alert alert-warning mt-3 text-center" role="alert">
            Debes iniciar sesión para finalizar la compra.
          </div>
        )}
      </div>
    </div>
  );
};