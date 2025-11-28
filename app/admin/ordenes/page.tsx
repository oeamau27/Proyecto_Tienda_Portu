'use client';

import React from 'react';

export default function OrdenesPage() {
  const ordenes = []; // ← futuro: traer desde backend o context

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <h2 className="text-2xl font-semibold">Gestión de Órdenes</h2>
      <p className="text-sm text-gray-600 mb-6">Total de órdenes: {ordenes.length}</p>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-2 text-left">ID</th>
              <th className="py-3 px-2 text-left">Cliente</th>
              <th className="py-3 px-2 text-left">Items</th>
              <th className="py-3 px-2 text-left">Total</th>
              <th className="py-3 px-2 text-left">Estado</th>
              <th className="py-3 px-2 text-left">Fecha</th>
              <th className="py-3 px-2 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl opacity-40">📦</div>
                    No hay órdenes registradas
                  </div>
                </td>
              </tr>
            ) : (
              ordenes.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="py-3 px-2">{o.id}</td>
                  <td className="py-3 px-2">{o.cliente}</td>
                  <td className="py-3 px-2">{o.items}</td>
                  <td className="py-3 px-2">{o.total}</td>
                  <td className="py-3 px-2">{o.estado}</td>
                  <td className="py-3 px-2">{o.fecha}</td>
                  <td className="py-3 px-2">-</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}