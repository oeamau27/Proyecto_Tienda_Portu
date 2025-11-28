'use client';

import React, { useState } from 'react';

interface Promotion {
  id: string;
  code: string;
  name: string;
  discount: string;
  minPurchase: string;
  period: string;
  uses: number;
  status: 'active' | 'inactive';
}

const PromotionsDashboard: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      code: '58154',
      name: 'cafe',
      discount: '20%',
      minPurchase: '$1.00',
      period: '13/11/2025 - 14/11/2025',
      uses: 0,
      status: 'inactive'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  
  const [promotionForm, setPromotionForm] = useState({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchase: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // Abrir modal para nueva promoción
  const openModal = () => {
    setIsModalOpen(true);
    setEditingPromotion(null);
    setPromotionForm({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minPurchase: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  // Abrir modal para editar promoción
  const openEditModal = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    
    // Parsear los datos existentes para el formulario
    const discountType = promotion.discount.includes('%') ? 'percentage' : 'fixed';
    const discountValue = promotion.discount.replace(/[%$]/g, '');
    const minPurchaseValue = promotion.minPurchase.replace('$', '');
    
    // Parsear fechas del periodo (formato: "13/11/2025 - 14/11/2025")
    const [startDateStr, endDateStr] = promotion.period.split(' - ');
    
    // Convertir formato "13/11/2025" a "2025-11-13"
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    setPromotionForm({
      name: promotion.name,
      code: promotion.code,
      discountType,
      discountValue,
      minPurchase: minPurchaseValue,
      startDate: parseDate(startDateStr),
      endDate: parseDate(endDateStr),
      description: ''
    });
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPromotion(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPromotionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  // Crear nueva promoción
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que todos los campos requeridos estén llenos
    if (!promotionForm.name || !promotionForm.code || !promotionForm.discountValue || 
        !promotionForm.startDate || !promotionForm.endDate) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    // Crear nueva promoción
    const promotion: Promotion = {
      id: Date.now().toString(),
      code: promotionForm.code,
      name: promotionForm.name,
      discount: `${promotionForm.discountValue}${promotionForm.discountType === 'percentage' ? '%' : '$'}`,
      minPurchase: promotionForm.minPurchase ? `$${promotionForm.minPurchase}` : '$0.00',
      period: `${formatDate(promotionForm.startDate)} - ${formatDate(promotionForm.endDate)}`,
      uses: 0,
      status: 'inactive'
    };

    // Agregar la nueva promoción al estado
    setPromotions(prev => [...prev, promotion]);
    closeModal();
    alert('Promoción creada exitosamente');
  };

  // Actualizar promoción existente - CORREGIDO
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingPromotion) return;

    // Validar que todos los campos requeridos estén llenos
    if (!promotionForm.name || !promotionForm.code || !promotionForm.discountValue || 
        !promotionForm.startDate || !promotionForm.endDate) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    // Actualizar promoción existente - MANTENIENDO el ID original y estado
    const updatedPromotion: Promotion = {
      id: editingPromotion.id, // ✅ Mantener el ID original
      code: promotionForm.code,
      name: promotionForm.name,
      discount: `${promotionForm.discountValue}${promotionForm.discountType === 'percentage' ? '%' : '$'}`,
      minPurchase: promotionForm.minPurchase ? `$${promotionForm.minPurchase}` : '$0.00',
      period: `${formatDate(promotionForm.startDate)} - ${formatDate(promotionForm.endDate)}`,
      uses: editingPromotion.uses, // ✅ Mantener los usos originales
      status: editingPromotion.status // ✅ Mantener el estado original
    };

    console.log('Actualizando promoción:', updatedPromotion); // Para debug

    // ✅ CORREGIDO: Usar map para actualizar la promoción existente
    setPromotions(prev => prev.map(promo => 
      promo.id === editingPromotion.id ? updatedPromotion : promo
    ));
    
    closeModal();
    alert('Promoción actualizada exitosamente');
  };

  const deletePromotion = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta promoción?')) {
      setPromotions(prev => prev.filter(promo => promo.id !== id));
    }
  };

  const togglePromotionStatus = (id: string) => {
    setPromotions(prev => prev.map(promo => 
      promo.id === id 
        ? { ...promo, status: promo.status === 'active' ? 'inactive' : 'active' }
        : promo
    ));
  };

  return (
    <div className="dashboard">
      <header className="dashboardHeader">
        <h2 className="dashboardTitle">Gestión de Promociones y Descuentos</h2>
        <p className="dashboardSubtitle">Crea y administra códigos promocionales</p>
      </header>

      <div className="promotionsActions">
        <button className="button buttonPrimary" onClick={openModal}>
          Nueva Promoción
        </button>
      </div>

      <div className="tableSection">
        <table className="productTable">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descuento</th>
              <th>Compra Mínima</th>
              <th>Periodo</th>
              <th>Usos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {promotions.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: '#6b7280' }}>
                  No hay promociones registradas
                </td>
              </tr>
            ) : (
              promotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td>{promotion.code}</td>
                  <td>{promotion.name}</td>
                  <td>{promotion.discount}</td>
                  <td>{promotion.minPurchase}</td>
                  <td>{promotion.period}</td>
                  <td>{promotion.uses}</td>
                  <td>
                    <button 
                      className={`status-button ${promotion.status === 'active' ? 'active' : 'inactive'}`}
                      onClick={() => togglePromotionStatus(promotion.id)}
                    >
                      {promotion.status === 'active' ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td>
                    <button 
                      className="button buttonSecondary" 
                      style={{ marginRight: '8px' }}
                      onClick={() => openEditModal(promotion)}
                    >
                      Editar
                    </button>
                    <button 
                      className="button buttonDanger"
                      onClick={() => deletePromotion(promotion.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Nueva/Editar Promoción */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <h3>{editingPromotion ? 'Editar Promoción' : 'Nueva Promoción'}</h3>
              <button className="closeButton" onClick={closeModal}>×</button>
            </div>
            
            {/* ✅ CORREGIDO: Usar handleUpdate para editar y handleSubmit para crear */}
            <form onSubmit={editingPromotion ? handleUpdate : handleSubmit}>
              <div className="modalBody">
                {/* Tabla de Nombre y Código */}
                <div className="formTable">
                  <div className="formTableRow">
                    <div className="formTableCell">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={promotionForm.name}
                        onChange={handleInputChange}
                        placeholder="Nombre de la promoción"
                        required
                      />
                    </div>
                    <div className="formTableCell">
                      <label>Código</label>
                      <input
                        type="text"
                        name="code"
                        value={promotionForm.code}
                        onChange={handleInputChange}
                        placeholder="Ej: VERANO2024"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="formSection">
                  <label className="sectionLabel">Descripción</label>
                  <textarea
                    name="description"
                    value={promotionForm.description}
                    onChange={handleInputChange}
                    placeholder="Descripción de la promoción"
                    rows={2}
                  />
                </div>

                {/* Tipo de Descuento y Compra Mínima en misma fila */}
                <div className="formTable">
                  <div className="formTableRow">
                    <div className="formTableCell">
                      <label className="sectionLabel">Tipo de Descuento</label>
                      <div className="radioGroup">
                        <label className="radioLabel">
                          <input
                            type="radio"
                            name="discountType"
                            value="fixed"
                            checked={promotionForm.discountType === 'fixed'}
                            onChange={handleInputChange}
                          />
                          <span className="radioCustom"></span>
                          Valor
                        </label>
                        <label className="radioLabel">
                          <input
                            type="radio"
                            name="discountType"
                            value="percentage"
                            checked={promotionForm.discountType === 'percentage'}
                            onChange={handleInputChange}
                          />
                          <span className="radioCustom"></span>
                          Porcentaje
                        </label>
                      </div>
                    </div>
                    <div className="formTableCell">
                      <label>Compra Mínima ($)</label>
                      <input
                        type="number"
                        name="minPurchase"
                        value={promotionForm.minPurchase}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Descuento */}
                <div className="formSection">
                  <label className="sectionLabel">Descuento</label>
                  <div className="discountInput">
                    <input
                      type="number"
                      name="discountValue"
                      value={promotionForm.discountValue}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                    <span className="discountSuffix">
                      {promotionForm.discountType === 'percentage' ? '%' : '$'}
                    </span>
                  </div>
                </div>

                {/* Fechas */}
                <div className="formTable">
                  <div className="formTableRow">
                    <div className="formTableCell">
                      <label>Fecha de Inicio</label>
                      <input
                        type="date"
                        name="startDate"
                        value={promotionForm.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="formTableCell">
                      <label>Fecha de Fin</label>
                      <input
                        type="date"
                        name="endDate"
                        value={promotionForm.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modalFooter">
                <button type="button" className="button buttonSecondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="button buttonPrimary">
                  {editingPromotion ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .status-button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
        }
        
        .status-button.active {
          background-color: #10b981;
          color: white;
        }
        
        .status-button.inactive {
          background-color: #ef4444;
          color: white;
        }
        
        .buttonDanger {
          background-color: #ef4444;
          color: white;
        }
        
        .buttonDanger:hover {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default PromotionsDashboard;