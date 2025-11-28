"use client";

import { useEffect, useState, useRef } from "react";

type OrderStatus = "pendiente" | "completada";

interface OrderItem {
  nombre: string;
  cantidad: number;
}

interface Order {
  id: string;
  fecha: string;
  estado: OrderStatus;
  items: OrderItem[];
  total: number;
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
      return "bg-yellow-100 text-yellow-800 border border-yellow-300";
    case "completada":
      return "bg-green-100 text-green-800 border border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-300";
  }
}

export default function OrdenesPage() {
  const [orden, setOrden] = useState<Order | null>(null);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [cargado, setCargado] = useState(false);

  const facturaRef = useRef<HTMLDivElement | null>(null);

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
  };

  const handleVerFactura = () => {
    if (orden) setMostrarFactura(true);
  };

  const handleCerrarFactura = () => {
    setMostrarFactura(false);
  };

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
      ...orden.items.map((item) => `- ${item.cantidad}x ${item.nombre}`),
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

  const handleImprimirFactura = () => {
    if (!facturaRef.current || !orden) return;
    const contenido = facturaRef.current.innerHTML;
    const printWindow = window.open("", "", "width=600,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Factura ${orden.id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: white;
              color: black;
              padding: 20px;
            }
            h2 {
              margin-top: 0;
            }
            ul {
              padding-left: 18px;
            }
          </style>
        </head>
        <body>${contenido}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <main className="min-h-[100vh] bg-white text-black">
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-semibold">Órdenes</h1>
        <p className="text-sm text-gray-600">
          Aquí podrás ver tus órdenes realizadas.
        </p>
      </div>

      {cargado && (
        <>
          {/* MODAL PRINCIPAL */}
          <div className="fixed inset-0 flex items-center justify-center px-4 z-40 bg-black/20">
            <div className="w-full max-w-md rounded-2xl bg-white border border-gray-300 shadow-xl p-5">
              <header className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                    ⏱
                  </span>
                  <h2 className="text-sm font-semibold">Historial de Órdenes</h2>
                </div>

                <button
                  onClick={handleCerrarHistorial}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </header>

              {!orden && (
                <div className="flex flex-col items-center py-8">
                  <div className="h-16 w-16 flex items-center justify-center rounded-xl border border-gray-300 bg-gray-100">
                    📦
                  </div>
                  <p className="mt-4 text-sm font-semibold text-gray-700">
                    Sin órdenes registradas
                  </p>
                  <p className="text-xs text-gray-500">
                    Aún no has realizado ninguna compra.
                  </p>
                </div>
              )}

              {orden && (
                <div className="rounded-xl bg-gray-50 border border-gray-300 px-4 py-3 space-y-3 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500">Orden #{orden.id}</p>
                      <p className="text-xs text-gray-500">{orden.fecha}</p>
                    </div>

                    <span
                      className={
                        "px-2 py-0.5 rounded-full text-xs font-medium " +
                        getEstadoClass(orden.estado)
                      }
                    >
                      {getEstadoLabel(orden.estado)}
                    </span>
                  </div>

                  <div className="text-gray-800 text-xs space-y-1">
                    {orden.items.map((item, idx) => (
                      <p key={idx}>
                        {item.cantidad}x {item.nombre}
                      </p>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="font-semibold text-base">${orden.total.toFixed(2)}</p>

                    <div className="flex gap-2 text-xs">
                      <button
                        onClick={handleVerFactura}
                        className="px-3 py-1 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
                      >
                        📄 Ver factura
                      </button>

                      <button className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800">
                        🔁 Repetir
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MODAL DE FACTURA */}
          {mostrarFactura && orden && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 px-4 z-50">
              <div className="w-full max-w-sm bg-white text-black border border-gray-300 rounded-2xl shadow-xl p-5">
                <header className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold">Factura</h2>
                  <button
                    onClick={handleCerrarFactura}
                    className="text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                </header>

                {/* LO QUE SE IMPRIME */}
                <div ref={facturaRef}>
                  <p><b>Nº de orden:</b> {orden.id}</p>
                  <p><b>Fecha:</b> {orden.fecha}</p>
                  <p><b>Estado:</b> {getEstadoLabel(orden.estado)}</p>
                  <p><b>Total:</b> ${orden.total.toFixed(2)}</p>

                  <hr className="my-2" />

                  <p className="font-semibold">Productos:</p>
                  <ul className="list-disc pl-4 mt-1">
                    {orden.items.map((item, idx) => (
                      <li key={idx}>
                        {item.cantidad}x {item.nombre}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 justify-end mt-4 text-xs">
                  <button
                    onClick={handleDescargarFactura}
                    className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    ⬇ Descargar
                  </button>

                  <button
                    onClick={handleImprimirFactura}
                    className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    🖨 Imprimir
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
