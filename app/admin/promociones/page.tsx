// app/admin/promociones/page.tsx
'use client';

import React from 'react';
import PromotionsDashboard from '../../components/PromotionsDashboard';
import './promociones.css';

const PromotionsPage: React.FC = () => {
  const handleSectionChange = (sectionId: string) => {
    console.log(`Cambiar a sección: ${sectionId}`);
    // Aquí puedes implementar la navegación entre páginas
    // router.push(`/admin/${sectionId}`);
  };

  return (
    <div className="adminPage">
     
      <main className="adminMain">
        <PromotionsDashboard />
      </main>
    </div>
  );
};

export default PromotionsPage;