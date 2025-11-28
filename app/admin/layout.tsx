"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { name: "Productos", path: "/admin" },
    { name: "Órdenes", path: "/admin/ordenes" },
    { name: "Usuarios", path: "/admin/usuarios" },
    { name: "Inventario", path: "/admin/inventario" },
    { name: "Promociones", path: "/admin/promociones" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center md:px-6">
        <h1 className="text-lg md:text-xl font-semibold">
          Tienda de Barrio "Portu" - Admin
        </h1>

        <button className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm md:text-base">
          Administrador
        </button>
      </header>

      {/* TABS RESPONSIVE */}
      <div className="flex justify-center mt-4 px-2">
        <div className="bg-gray-200 px-2 py-2 rounded-full flex gap-2 md:gap-6 overflow-auto">
          {tabs.map((tab) => {
            const active = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full transition text-sm md:text-base ${
                  active
                    ? "bg-white shadow font-semibold"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="max-w-5xl mx-auto py-6 px-3 md:px-4">
        {children}
      </main>
    </div>
  );
}
