"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: number;
  nombre: string;
  img: string;
  price: number;
  qty: number;
}

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

useEffect(() => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    const parsed = JSON.parse(saved);

    // limpiar items inválidos
    const valid = parsed.filter((item: any) => item.price !== undefined);

    setCart(valid);
  }
}, []);


  function addToCart(item: CartItem) {
    setCart(prev => [...prev, item]);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
