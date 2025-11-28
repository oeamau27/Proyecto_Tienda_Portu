'use client';

import React from 'react';

export default function UsuariosPage() {
  const usuarios = []; // futuro: traer desde backend

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <h2 className="text-2xl font-semibold">Gestión de Usuarios</h2>
      <p className="text-sm text-gray-600 mb-6">Total de clientes: {usuarios.length}</p>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-2 text-left">Cliente</th>
              <th className="py-3 px-2 text-left">Email</th>
              <th className="py-3 px-2 text-left">Teléfono</th>
              <th className="py-3 px-2 text-left">Dirección</th>
              <th className="py-3 px-2 text-left">Órdenes</th>
              <th className="py-3 px-2 text-left">Registrado</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <div className="text-4xl opacity-40">👥</div>
                    No hay clientes registrados
                  </div>
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-3 px-2">{u.nombre}</td>
                  <td className="py-3 px-2">{u.email}</td>
                  <td className="py-3 px-2">{u.telefono}</td>
                  <td className="py-3 px-2">{u.direccion}</td>
                  <td className="py-3 px-2">{u.ordenes}</td>
                  <td className="py-3 px-2">{u.registrado}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
