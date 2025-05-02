"use client";
import React, { useState } from "react";
import "@/src/ui/styles/BeerCatalogo.css";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import BeerPago from "@/src/ui/components/BeerPagos";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Cerveza Artesanal IPA",
    description: "Una cerveza con amargor balanceado y aroma cítrico.",
    price: 3.5,
  },
  {
    id: 2,
    name: "Cerveza Lager Dorada",
    description: "Refrescante, suave y perfecta para días calurosos.",
    price: 3.0,
  },
  {
    id: 3,
    name: "Cerveza Negra Stout",
    description: "Notas a café y chocolate, cuerpo completo.",
    price: 4.0,
  },
];

export default function CatalogoBeer() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };
  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  }; 

  const goBack = () => {
    router.back();
  };

  return (
    <div className="catalogo-container">
      <nav className="catalogo-navbar">
        <button className="volver-btn" onClick={goBack}>
          <FaArrowLeft /> Volver
        </button>
        <div className="carrito-icon" onClick={() => setShowPopup(true)}>
          <FaShoppingCart />
          <span className="cart-count">{cartItems.length}</span>
        </div>
      </nav>

      <h1 className="catalogo-title">Catálogo de Cervezas</h1>

      <div className="productos-grid">
        {products.map((product) => (
          <div key={product.id} className="producto-card">
            <div className="producto-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="precio">${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)} className="agregar-btn">
                Agregar al carro
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && <BeerPago products={cartItems} onClose={() => setShowPopup(false)}
    onRemoveItem={handleRemoveItem} />}
    </div>
  );
}
