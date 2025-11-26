"use client";

import { useState } from "react";
import ProductCard from "./components/ProductCard";
import FilterDrawer from "./components/FilterDrawer";
import LoginModal from "./components/LoginModal";

interface Producto {
  id: number;
  nombre: string;
  img: string;
}

export default function HomePage() {

  // Estado del login modal
  const [openLogin, setOpenLogin] = useState(false);

  // Estado del panel de filtros
  const [openFilters, setOpenFilters] = useState(false);

  // LISTA DE PRODUCTOS
  const productos: Producto[] = [
    { id: 1, nombre: "Ace Surf", img: "/img/ace-surf.jpg" },
    { id: 2, nombre: "Ace Omo", img: "/img/ace-omo.jpg" },
    { id: 3, nombre: "Aceite 2L", img: "/img/aceite-2l.jpg" },
    { id: 4, nombre: "Aceite 450ml", img: "/img/aceite-450ml.jpg" },
    { id: 5, nombre: "Agua Sport 1.5L", img: "/img/agua-sport-1.5l.jpg" },
    { id: 6, nombre: "Agua Villasante 7L", img: "/img/agua-villasante-7l.jpg" },
    { id: 7, nombre: "Agua Vital 3L", img: "/img/agua-vital-3l.jpg" },
    { id: 8, nombre: "Ajinomen", img: "/img/ajinomen.jpg" },
    { id: 9, nombre: "Ajinomen Vaso", img: "/img/ajinomen-vaso.jpg" },
    { id: 10, nombre: "Alcohol", img: "/img/alcohol.jpg" },

    { id: 11, nombre: "Baton", img: "/img/baton.jpg" },
    { id: 12, nombre: "Bolichoc (estrella)", img: "/img/bolichoc-estrella.jpg" },
    { id: 13, nombre: "Bon o Bon", img: "/img/bon-o-bon.jpg" },
    { id: 14, nombre: "Budín (La Suprema)", img: "/img/budin-la-suprema.jpg" },
    { id: 15, nombre: "Burguesa cerveza lata grande", img: "/img/cerveza-lata-grande.jpg" },

    { id: 16, nombre: "Canela molida", img: "/img/canela-molida.jpg" },
    { id: 17, nombre: "Casa Real Azul", img: "/img/casa-real-azul.jpg" },
    { id: 18, nombre: "Casa Real Negro", img: "/img/casa-real-negro.jpg" },
    { id: 19, nombre: "Casa Real Rojo", img: "/img/casa-real-rojo.jpg" },
    { id: 20, nombre: "Cascada Durazno 2L", img: "/img/cascada-durazno-2l.jpg" },
    { id: 21, nombre: "Cascada Fresa 2L", img: "/img/cascada-fresa-2l.jpg" },
    { id: 22, nombre: "Cascada Guaraná 2L", img: "/img/cascada-guarana-2l.jpg" },
    { id: 23, nombre: "Cascada Mandarina 2L", img: "/img/cascada-mandarina-2l.jpg" },
    { id: 24, nombre: "Cascada Papaya 3L", img: "/img/cascada-papaya-3l.jpg" },
    { id: 25, nombre: "Cascada Pequeño", img: "/img/cascada-pequeno.jpg" }
  ];

  return (
    <div className="pb-24 bg-white">

      {/* HEADER */}
      <header className="p-4 border-b border-black bg-white sticky top-0 z-40">
        
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Tienda "Portu"</h1>

          {/* BOTÓN QUE ABRE EL MODAL */}
          <button
            onClick={() => setOpenLogin(true)}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="mt-3 flex items-center border border-black rounded-xl p-2 gap-2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="flex-1 bg-transparent text-black placeholder-black focus:outline-none"
          />
          <button onClick={() => setOpenFilters(true)} className="text-black text-xl">⚙️</button>
        </div>

      </header>

      {/* PRODUCTOS */}
      <div className="
        grid 
        grid-cols-2 
        md:grid-cols-3 
        xl:grid-cols-4 
        gap-4 
        px-4
        pt-4
      ">
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>

      {/* PANEL DE FILTROS */}
      <FilterDrawer open={openFilters} onClose={() => setOpenFilters(false)} />

      {/* MODAL LOGIN */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />

    </div>
  );
}
