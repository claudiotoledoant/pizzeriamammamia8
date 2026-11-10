import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container text-center my-5">
      <div className="italian-card p-5">
        <h1 className="display-3 text-danger mb-3">Benvenuti a Mamma Mía!</h1>
        <p className="lead fs-4 text-muted mb-4">
          Tradizione, passione e il vero sapore della pizza italiana al forno a legna. 🍕🔥
        </p>
        <hr className="my-4" />
        <p className="mb-4">Ingredientes 100% frescos e importados directamente desde Italia.</p>
        <Link to="/cart" className="btn btn-italian-red btn-lg px-4 py-2">
          Ver Nuestro Carrito 🛒
        </Link>
      </div>
    </div>
  );
};