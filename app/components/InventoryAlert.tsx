// components/InventoryAlert.tsx
'use client';

import React from 'react';

interface InventoryAlertProps {
  lowStockCount?: number;
}

const InventoryAlert: React.FC<InventoryAlertProps> = ({ lowStockCount = 0 }) => {
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

export default InventoryAlert;