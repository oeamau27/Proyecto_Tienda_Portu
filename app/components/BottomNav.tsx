// components/BottomNav.tsx
"use client";
import Link from "next/link";

export default function BottomNav() {
  
    return (
    <nav className="
      fixed bottom-0 left-0 w-full 
      bg-white border-t border-black 
      flex justify-around items-center 
      py-3 
      text-black text-sm 
      z-50
    ">
      <Link href="/" className="flex flex-col items-center gap-1">
        <span className="text-xl">🏠</span>
        <span>Inicio</span>
      </Link>

      <Link href="/carrito" className="flex flex-col items-center gap-1">
        <span className="text-xl">🛒</span>
        <span>Carrito</span>
      </Link>

      <Link href="/ordenes" className="flex flex-col items-center gap-1">
        <span className="text-xl">🔄</span>
        <span>Órdenes</span>
      </Link>

      <Link href="/cuenta" className="flex flex-col items-center gap-1">
        <span className="text-xl">👤</span>
        <span>Cuenta</span>
      </Link>
    </nav>
  );
}
