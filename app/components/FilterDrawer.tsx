// components/FilterDrawer.tsx
"use client";

export default function FilterDrawer({ open, onClose }: any) {
  return (
    <>
      {/* OVERLAY OSCURO */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm 
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* PANEL DESLIZANTE */}
      <div
        className={`
          fixed top-0 right-0 h-full 
          w-[85%] max-w-sm bg-white 
          border-l border-black 
          rounded-l-2xl p-5 
          transition-transform duration-300 
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER DEL PANEL */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-black">Filtros</h2>
          <button onClick={onClose} className="text-xl text-black">✖</button>
        </div>

        {/* BUSCADOR */}
        <input  
          type="text"
          placeholder="Buscar productos..."
          className="w-full p-2 mb-5 border border-black rounded-lg text-black placeholder-black"
        />

        {/* CATEGORÍA */}
        <label className="text-sm font-semibold text-black">Categoría</label>
        <select className="w-full mt-1 mb-4 p-2 border border-black rounded-lg text-black">
          <option>Todas las Categorías</option>
        </select>

        {/* CALIDAD */}
        <label className="text-sm font-semibold text-black">Calidad</label>
        <select className="w-full mt-1 mb-4 p-2 border border-black rounded-lg text-black">
          <option>Todas las Calidades</option>
        </select>

        {/* ORDENAR */}
        <label className="text-sm font-semibold text-black">Ordenar por</label>
        <select className="w-full mt-1 mb-4 p-2 border border-black rounded-lg text-black">
          <option>Destacados</option>
        </select>

        {/* RANGO DE PRECIO */}
        <label className="text-sm font-semibold text-black">Rango de Precio</label>
        <input type="range" className="w-full mt-3 accent-black" />

        {/* BOTÓN APLICAR */}
        <button className="w-full mt-6 py-3 bg-black text-white rounded-lg font-semibold text-sm">
          Aplicar Filtros
        </button>
      </div>
    </>
  );
}
