"use client";

import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function CarritoPage() {
  const { cart, setCart } = useCart();
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-[#f7f8fa] text-black">
        <div className="text-7xl text-black/40 mb-4">🛒</div>
        <p className="text-lg font-semibold">Inicia sesión para ver tu carrito</p>
      </div>
    );
  }

  function removeItem(index: number) {
    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
  }

  function changeQty(index: number, amount: number) {
    const copy = [...cart];
    const newQty = (copy[index].qty || 1) + amount;
    if (newQty < 1) return;
    copy[index].qty = newQty;
    setCart(copy);
  }

  const total = cart.reduce((sum: number, item: any) => {
    return sum + (item.price * (item.qty || 1));
  }, 0);

  return (
    <div className="p-4 pb-32 text-black">

      <h1 className="text-2xl font-bold mb-6">Mi Carrito</h1>

      {cart.map((p: any, i: number) => (
        <div key={i} className="bg-white p-4 rounded-xl border shadow-sm mb-4 flex items-center">
          
          <img src={p.img} className="w-20 h-20 rounded-lg object-cover border" />

          <div className="ml-4 flex-1">
            <h2 className="font-semibold text-lg">{p.nombre}</h2>
            <p className="text-black/70">${p.price.toFixed(2)}</p>

            <div className="flex items-center gap-2 mt-2">
              <button
                className="w-8 h-8 border rounded flex items-center justify-center"
                onClick={() => changeQty(i, -1)}
              >-</button>

              <span>{p.qty}</span>

              <button
                className="w-8 h-8 border rounded flex items-center justify-center"
                onClick={() => changeQty(i, +1)}
              >+</button>
            </div>
          </div>

<button
  className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center"
  onClick={() => removeItem(i)}
>
  🗑️ Eliminar
</button>

        </div>
      ))}

      <div className="bg-white p-4 rounded-xl border shadow-sm mt-6">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-xl mt-4 font-semibold">
          Proceder al Pago
        </button>
      </div>
    </div>
  );
}
