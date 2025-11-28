'use client';

import { useState } from 'react';
import CardCuenta from '../cuenta/CardCuenta';
import CardEditar from '../cuenta/CardEditar';

export default function CuentaPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
      <div className="mt-4">
        {isEditing ? (
          <CardEditar onClose={() => setIsEditing(false)} />
        ) : (
          <CardCuenta onEdit={() => setIsEditing(true)} />
        )}
    </div>
  );
}
