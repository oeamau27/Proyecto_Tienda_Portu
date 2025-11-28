"use client";

import { useState } from "react";
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  products: string[];
  total: number;
  status: 'entregado' | 'pendiente' | 'cancelado';
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2025-11-20',
      products: ['Leche pil', 'Galletas'],
      total: 15.00,
      status: 'entregado'
    },
    {
      id: 'ORD-002',
      date: '2025-11-25',
      products: ['Pipocas', 'Refresco cocacola'],
      total: 20.50,
      status: 'pendiente'
    },
    {
      id: 'ORD-003',
      date: '2025-11-15',
      products: ['Arroz"', 'Canela'],
      total: 10.00,
      status: 'entregado'
    },
    {
      id: 'ORD-004',
      date: '2025-11-10',
      products: ['Mayonesa,Mostaza,Ketchup'],
      total: 12.00,
      status: 'cancelado'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'entregado':
        return <CheckCircle className="w-5 h-5" />;
      case 'pendiente':
        return <Clock className="w-5 h-5" />;
      case 'cancelado':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleRepeatOrder = (orderId: string) => {
    alert(`Repetir orden: ${orderId}`);
    // Aquí puedes agregar lógica para volver a agregar los productos al carrito
  };

  const handleInvoice = (orderId: string) => {
    alert(`Generando factura para la orden: ${orderId}`);
    // Aquí puedes agregar lógica para generar la factura
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Mis Órdenes</h1>
          </div>
          <p className="text-gray-600">Historial completo de tus compras</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      Orden #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${getStatusColor(order.status)} font-semibold capitalize`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Productos:</h3>
                  <ul className="space-y-1 mb-4">
                    {order.products.map((product, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                        {product}
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-gray-600 font-medium">Total:</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      onClick={() => handleRepeatOrder(order.id)}
                    >
                      Repetir Compra
                    </button>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      onClick={() => handleInvoice(order.id)}
                    >
                      Facturar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay órdenes aún
            </h3>
            <p className="text-gray-500">
              Tus compras aparecerán aquí una vez que realices un pedido
            </p>
          </div>
        )}
      </div>
    </div>
  );
}