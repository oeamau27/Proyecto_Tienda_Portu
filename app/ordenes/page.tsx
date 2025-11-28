"use client";

import { useEffect, useState } from "react";

type OrderStatus = "pendiente" | "completada";

interface OrderItem {
  nombre: string;
  cantidad: number;
}

interface Order {
  id: string;        // ej: "order-17"
  fecha: string;     // ej: "26 de noviembre de 2025"
  estado: OrderStatus;
  items: OrderItem[];
  total: number;     // ej: 4.98
}

function getEstadoLabel(estado: OrderStatus) {
  switch (estado) {
    case "pendiente":
      return "Pendiente";
    case "completada":
      return "Completada";
    default:
      return estado;
  }
}

function getEstadoClass(estado: OrderStatus) {
  switch (estado) {
    case "pendiente":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/40";
    case "completada":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40";
    default:
      return "bg-neutral-700/40 text-neutral-200 border border-neutral-600/50";
  }
}

export default function OrdenesPage() {
  const [orden, setOrden] = useState<Order | null>(null);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [cargado, setCargado] = useState(false);

  // 🔹 Al cargar la página, leer la última orden guardada
  useEffect(() => {
    try {
      const data = window.localStorage.getItem("ultimaOrden");
      if (data) {
        setOrden(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error leyendo ultimaOrden:", error);
    } finally {
      setCargado(true);
    }
  }, []);

  const handleCerrar = () => {
    setOrden(null); // queda estado vacío
    setMostrarFactura(false);
    // si quieren borrar el historial:
    // window.localStorage.removeItem("ultimaOrden");
  };

  const handleVerFactura = () => {
    setMostrarFactura((prev) => !prev);
  };

  const handleRepetir = () => {
    if (!orden) return;
    alert("Aquí se repetiría la compra de la orden #" + orden.id);
  };

  return (
    <main className="min-h-[100vh]">
      {/* Texto que no puedes cambiar */}
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-semibold">Órdenes</h1>
        <p className="text-sm text-neutral-300">
          Aquí podrás ver tus órdenes realizadas.
        </p>
      </div>

      {/* Solo mostramos el modal cuando ya intentamos leer localStorage */}
      {cargado && (
        <div className="fixed inset-0 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl p-5">
            {/* Header del modal */}
            <header className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 text-xs">
                  ⏱
                </span>
                <h2 className="text-sm font-medium">Historial de Órdenes</h2>
              </div>
              <button
                type="button"
                onClick={handleCerrar}
                className="text-neutral-500 text-sm hover:text-neutral-200"
              >
                ✕
              </button>
            </header>

            {/* 🔸 Si NO hay orden guardada → pantalla vacía (como el primer Figma) */}
            {!orden && (
              <div className="flex flex-col items-center justify-center py-8 gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-neutral-700">
                  <span className="text-2xl">📦</span>
                </div>
                <p className="text-xs text-neutral-400 text-center">
                  Aún no has realizado ninguna compra
                </p>
              </div>
            )}

            {/* 🔸 Si SÍ hay orden → detalle (como el segundo Figma) */}
            {orden && (
              <div className="rounded-xl bg-neutral-950/60 border border-neutral-800 px-4 py-3 space-y-3 text-sm">
                {/* Encabezado de la orden */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-neutral-400">
                      Orden #{orden.id}
                    </p>
                    <p className="text-xs text-neutral-400">{orden.fecha}</p>
                  </div>
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                      getEstadoClass(orden.estado)
                    }
                  >
                    {getEstadoLabel(orden.estado)}
                  </span>
                </div>

                {/* Productos */}
                <div className="space-y-1 text-xs text-neutral-200">
                  {orden.items.map((item, index) => (
                    <p key={index}>
                      {item.cantidad}x {item.nombre}
                    </p>
                  ))}
                </div>

                {/* Total + botones */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">${orden.total.toFixed(2)}</p>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleVerFactura}
                      className="inline-flex items-center gap-1 rounded-lg border border-neutral-700 px-2 py-1 hover:bg-neutral-800"
                    >
                      📄 <span>Ver factura</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRepetir}
                      className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 text-neutral-900 px-3 py-1 hover:bg-neutral-200"
                    >
                      🔁 <span>Repetir</span>
                    </button>
                  </div>
                </div>

                {/* Bloque que aparece al pulsar "Ver factura" */}
                {mostrarFactura && (
                  <div className="mt-3 rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-neutral-300 space-y-1">
                    <p className="font-semibold">Factura</p>
                    <p>Nº de orden: {orden.id}</p>
                    <p>Fecha: {orden.fecha}</p>
                    <p>Total: ${orden.total.toFixed(2)}</p>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      * Aquí podrían ir más datos (método de pago, dirección, etc.).
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}