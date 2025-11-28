// components/InventoryDashboard.tsx (versión responsive)
'use client';

import React from 'react';
import InventoryAlert from './InventoryAlert';
import SummaryCard from './SummaryCard';
import ProductTable from './ProductTable';

interface Product {
  name: string;
  category: string;
  stock: string;
  unitPrice: string;
  stockValue: string;
  status: string;
}

interface InventoryData {
  totalProducts: number;
  itemsInStock: number;
  inventoryValue: string;
  lowStockCount: number;
}

const InventoryDashboard: React.FC = () => {
  const inventoryData: InventoryData = {
    totalProducts: 14,
    itemsInStock: 326,
    inventoryValue: '$792.44',
    lowStockCount: 1
  };

  const products: Product[] = [
    {
      name: 'Café Instantáneo',
      category: 'Despensa',
      stock: '8 unidades',
      unitPrice: '$3.99',
      stockValue: '$31.92',
      status: 'Stock Bajo'
    },
    {
      name: 'Pan de Molde',
      category: 'Panaderia',
      stock: '12 unidades',
      unitPrice: '$1.99',
      stockValue: '$23.88',
      status: 'En Stock'
    },
    {
      name: 'Jugo de Naranja',
      category: 'Bebidas',
      stock: '14 unidades',
      unitPrice: '$2.79',
      stockValue: '$39.06',
      status: 'En Stock'
    },
    {
      name: 'Leche Entera 1L',
      category: 'Lacteos',
      stock: '15 unidades',
      unitPrice: '$1.79',
      stockValue: '$26.85',
      status: 'En Stock'
    },
    {
      name: 'Detergente Líquido',
      category: 'Limpieza',
      stock: '16 unidades',
      unitPrice: '$4.99',
      stockValue: '$79.84',
      status: 'En Stock'
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboardHeader">
        <h2 className="dashboardTitle">Control de Inventario</h2>
        <p className="dashboardSubtitle">Monitorea el stock de tus productos</p>
      </header>

      <InventoryAlert lowStockCount={inventoryData.lowStockCount} />

      <hr className="divider" />

      <div className="summarySection">
        <h3 className="sectionTitle">Total de Productos</h3>
        <div className="summaryGrid">
          <div className="summaryItem">
            <div className="value">{inventoryData.totalProducts}</div>
          </div>
        </div>

        <div className="summaryGrid">
          <div className="summaryItem">
            <h3>Items en Stock</h3>
            <div className="value">{inventoryData.itemsInStock}</div>
          </div>
          <div className="summaryItem">
            <h3>Valor del Inventario</h3>
            <div className="value">{inventoryData.inventoryValue}</div>
          </div>
        </div>
      </div>

      <div className="tableSection">
        <h3 className="tableTitle">Producto</h3>
        <ProductTable products={products} />
      </div>
    </div>
  );
};

export default InventoryDashboard;