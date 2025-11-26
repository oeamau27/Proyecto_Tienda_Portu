// components/ProductCard.tsx
export default function ProductCard({ producto }: any) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/10">
      
      {/* IMAGEN */}
      <div className="relative h-40 w-full">
        <img
          src={producto.img}
          alt={producto.nombre}
          className="w-full h-full object-cover"
        />

        {/* ETIQUETA */}
        <span className="absolute top-2 left-2 bg-blue-700 text-white px-2 py-1 rounded-lg text-xs font-semibold">
          {producto.etiqueta}
        </span>
      </div>

      {/* INFO */}
      <div className="p-3">
        <h3 className="font-semibold text-black text-sm">{producto.nombre}</h3>
        <p className="font-bold text-black text-sm">${producto.precio}</p>

        {/* BOTÓN */}
        <button className="w-full bg-black text-white py-2 rounded-lg mt-2 text-sm font-medium">
          Agregar
        </button>
      </div>
    </div>
  );
}
