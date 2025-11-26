export default function CarritoPage() {
  return (
    <div className="w-full h-full bg-[#f7f8fa] flex flex-col justify-center items-center text-black px-4">

      {/* Ícono */}
      <div className="text-[90px] text-black/40 mb-4">
        🛒
      </div>

      {/* Texto */}
      <h2 className="text-lg font-semibold text-black mb-3">
        Tu carrito está vacío
      </h2>

      {/* Botón */}
      <a
        href="/"
        className="bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold"
      >
        Ver Productos
      </a>
    </div>
  );
}
