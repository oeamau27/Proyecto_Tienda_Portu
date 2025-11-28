'use client';

import Link from 'next/link';
import { useState } from 'react';
import AdminDropdown from './AdminDropdown'; // El dropdown que hicimos

export default function AdminTopBar() {
  return (
    <header className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      
      {/* Lado Izquierdo - Nombre de la tienda */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        <h1 className="font-semibold text-gray-800">Tienda de Barrio “Portu” - Admin</h1>
      </div>

      {/* Menú de Administrador */}
      <div className="flex items-center">
        <AdminDropdown />
      </div>
    </header>
  );
}
