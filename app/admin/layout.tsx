"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tienda de Barrio "Portu" - Admin</h1>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Administrador
        </button>
      </header>

      {/* TABS */}
      <div className="flex justify-center mt-6">
        <div className="bg-gray-200 px-4 py-2 rounded-full flex gap-6">
          {tabs.map((tab) => {
            const active = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
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

      {/* PAGE CONTENT */}
      <main className="max-w-6xl mx-auto py-8 px-4">{children}</main>
    </div>
  );
}
