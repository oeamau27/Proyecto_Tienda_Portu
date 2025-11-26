"use client";

import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ producto, onLoginRequest }: any) {
  const { user } = useUser();
  const { addToCart } = useCart();

  function handleAdd() {
    if (!user) {
      onLoginRequest();  // 🔥 abrir login
      return;
    }

    addToCart({ ...producto, qty: 1 }); // 🔥 agregar al carrito
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-black/10 overflow-hidden">
      <div className="relative h-40">
        <img src={producto.img} className="w-full h-full object-cover" />
      </div>

      <div className="p-3">
        <h3 className="font-bold text-black">{producto.nombre}</h3>

        <button
          onClick={handleAdd}
          className="w-full bg-black text-white py-2 rounded-lg mt-2 text-sm font-semibold"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
