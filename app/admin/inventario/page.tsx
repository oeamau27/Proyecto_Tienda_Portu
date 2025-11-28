
'use client';

import React from 'react';
import './inventario.css';

interface MenuItem {
  id: string;
  label: string;
  checked: boolean;
}

interface Product {
  name: string;
  category: string;
  stock: string;
  unitPrice: string;
  stockValue: string;
  status: string;
}


const Badge: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'default' | 'warning' | 'danger' | 'success';
}> = ({ children, variant = 'default' }) => {
  return (
    <span className={`badge badge${variant.charAt(0).toUpperCase() + variant.slice(1)}`}>
      {children}
    </span>
  );
};

// Componente InventoryAlert
const InventoryAlert: React.FC<{ lowStockCount?: number }> = ({ lowStockCount = 0 }) => {
  if (lowStockCount === 0) return null;

  return (
    <div className="inventoryAlert">
      <label className="alertCheckboxLabel">
        <input type="checkbox" className="checkbox" />
        <span className="checkmark"></span>
        Alerta de Stock Bajo
      </label>
      <p className="alertMessage">
        Hay {lowStockCount} producto(s) con stock bajo. Considera reabastecerlos pronto.
      </p>
    </div>
  );
};

// Componente ProductTable
const ProductTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const getBadgeVariant = (status: string): 'default' | 'warning' | 'danger' | 'success' => {
    switch (status) {
      case 'Stock Bajo':
        return 'warning';
      case 'Sin Stock':
        return 'danger';
      case 'En Stock':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="tableContainer">
      <table className="productTable">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock Actual</th>
            <th>Precio Unitario</th>
            <th>Valor en Stock</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="productName">{product.name}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.unitPrice}</td>
              <td>{product.stockValue}</td>
              <td>
                <Badge variant={getBadgeVariant(product.status)}>
                  {product.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Componente InventoryDashboard
const InventoryDashboard: React.FC = () => {
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

      <InventoryAlert lowStockCount={1} />

      <hr className="divider" />

      <div className="summarySection">
        <h3 className="sectionTitle">Total de Productos</h3>
        <div className="summaryGrid">
          <div className="summaryItem">
            <div className="value">14</div>
          </div>
        </div>

        <div className="summaryGrid">
          <div className="summaryItem">
            <h3>Items en Stock</h3>
            <div className="value">326</div>
          </div>
          <div className="summaryItem">
            <h3>Valor del Inventario</h3>
            <div className="value">$792.44</div>
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

// Página principal de Inventario
const InventoryPage: React.FC = () => {
  const handleSectionChange = (sectionId: string) => {
    console.log(`Cambiar a sección: ${sectionId}`);
  };

  return (
    <div className="inventarioPage">
     
      <main className="inventarioMain">
        <InventoryDashboard />
      </main>
    </div>
  );
};

export default InventoryPage;