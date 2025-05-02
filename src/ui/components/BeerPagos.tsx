import React from "react";
import "@/src/ui/styles/BeerPagos.css";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

interface BeerPagoProps {
  products: Product[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
}

const BeerPago: React.FC<BeerPagoProps> = ({ products, onClose, onRemoveItem }) => {
  const total = products.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Tu carrito</h2>
        {products.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="cart-list">
                {products.map((item, index) => (
                    <li key={index} className="cart-item">
                    <div className="cart-item-content">
                        <span><strong>{item.name}</strong> - ${item.price.toFixed(2)}</span>
                        <button className="eliminar-btn" onClick={() => onRemoveItem(index)}>
                            Eliminar
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <p className="total">Total: ${total.toFixed(2)}</p>
            <div className="metodo-pago">
              <label>Medio de pago:</label>
              <div className="custom-select">
                <select>
                  <option>Tarjeta</option>
                  <option>Nequi</option>
                  <option>Daviplata</option>
                </select>
              </div>
            </div>
            <button className="confirmar-btn">Confirmar pedido</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BeerPago;
