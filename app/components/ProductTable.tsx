// components/ProductTable.tsx
'use client';

import React from 'react';
import Badge from './Badge';

interface Product {
  name: string;
  category: string;
  stock: string;
  unitPrice: string;
  stockValue: string;
  status: string;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
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
                <Badge 
                  variant={getBadgeVariant(product.status)}
                  responsive={true}
                  className="badge-interactive"
                >
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

export default ProductTable;