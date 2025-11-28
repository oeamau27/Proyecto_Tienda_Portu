"use client";

import { useEffect, useState, useRef } from "react";

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

  // 🔹 ref para el contenido de la factura (para imprimir solo eso)
  const facturaRef = useRef<HTMLDivElement | null>(null);

  // Leer la última orden desde localStorage
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

  const handleCerrarHistorial = () => {
    setOrden(null);
    setMostrarFactura(false);
    // Si quisieran borrar el historial real:
    // window.localStorage.removeItem("ultimaOrden");
  };

  const handleVerFactura = () => {
    if (!orden) return;
    setMostrarFactura(true);
  };

  const handleCerrarFactura = () => {
    setMostrarFactura(false);
  };

  const handleRepetir = () => {
    if (!orden) return;
    alert("Aquí se repetiría la compra de la orden #" + orden.id);
  };

  // Descargar factura como archivo .txt
  const handleDescargarFactura = () => {
    if (!orden) return;

    const contenido = [
      `Factura`,
      `-------------------------`,
      `Nº de orden: ${orden.id}`,
      `Fecha: ${orden.fecha}`,
      `Estado: ${getEstadoLabel(orden.estado)}`,
      ``,
      `Productos:`,
      ...orden.items.map(
        (item) => `- ${item.cantidad}x ${item.nombre}`
      ),
      ``,
      `Total: $${orden.total.toFixed(2)}`,
    ].join("\n");

    const blob = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `factura-${orden.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 🔹 Imprimir SOLO la factura (abre una ventana con solo ese contenido)
  const handleImprimirFactura = () => {
    if (!facturaRef.current || !orden) return;

    const contenido = facturaRef.current.innerHTML;

    const printWindow = window.open("", "", "width=600,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Factura ${orden.id}</title>
          <meta charSet="utf-8" />
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              background: #111;
              color: #eee;
              padding: 16px;
            }
            h2 {
              margin-top: 0;
            }
            ul {
              padding-left: 16px;
            }
            li {
              margin-bottom: 4px;
            }
          </style>
        </head>
        <body>
          ${contenido}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <main className="min-h-[100vh]">
      {/* Texto superior de la página */}
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-semibold">Órdenes</h1>
        <p className="text-sm text-neutral-300">
          Aquí podrás ver tus órdenes realizadas.
        </p>
      </div>

      {cargado && (
        <>
          {/* Modal principal: Historial de Órdenes */}
          <div className="fixed inset-0 flex items-center justify-center px-4 z-40">
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
                  onClick={handleCerrarHistorial}
                  className="text-neutral-500 text-sm hover:text-neutral-200"
                >
                  ✕
                </button>
              </header>

              {/* Si NO hay orden → estado vacío */}
              {!orden && (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-neutral-700">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-neutral-200">
                      Sin órdenes registradas
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Aún no has realizado ninguna compra.
                    </p>
                  </div>
                </div>
              )}

              {/* Si SÍ hay orden → detalle de compra */}
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
                    <p className="text-sm font-semibold">
                      ${orden.total.toFixed(2)}
                    </p>

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
                </div>
              )}
            </div>
          </div>

          {/* Segundo modal: Factura (pantalla emergente encima) */}
          {mostrarFactura && orden && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
              <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-5">
                {/* Header factura */}
                <header className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold">Factura</h2>
                  <button
                    type="button"
                    onClick={handleCerrarFactura}
                    className="text-neutral-400 text-sm hover:text-neutral-100"
                  >
                    ✕
                  </button>
                </header>

                {/* Contenido factura (lo que se imprime) */}
                <div ref={facturaRef}>
                  <div className="space-y-1 text-xs text-neutral-300">
                    <p>
                      <span className="font-semibold">Nº de orden:</span>{" "}
                      {orden.id}
                    </p>
                    <p>
                      <span className="font-semibold">Fecha:</span>{" "}
                      {orden.fecha}
                    </p>
                    <p>
                      <span className="font-semibold">Estado:</span>{" "}
                      {getEstadoLabel(orden.estado)}
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span>{" "}
                      ${orden.total.toFixed(2)}
                    </p>

                    <hr className="my-2 border-neutral-700" />

                    <p className="font-semibold mb-1">Productos</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {orden.items.map((item, index) => (
                        <li key={index}>
                          {item.cantidad}x {item.nombre}
                        </li>
                      ))}
                    </ul>

                    <p className="text-[10px] text-neutral-500 mt-3">
                      * Aquí podrían ir más datos (método de pago, dirección de
                      entrega, etc.).
                    </p>
                  </div>
                </div>

                {/* Botones de Descargar e Imprimir */}
                <div className="mt-4 flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={handleDescargarFactura}
                    className="inline-flex items-center gap-1 rounded-lg border border-neutral-700 px-3 py-1 hover:bg-neutral-800"
                  >
                    ⬇ <span>Descargar factura</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleImprimirFactura}
                    className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 text-neutral-900 px-3 py-1 hover:bg-neutral-200"
                  >
                    🖨 <span>Imprimir</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
