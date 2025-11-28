'use client';

import React, { useState, useEffect } from 'react';

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

const emptyForm = {
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: '',
  minPurchase: '',
  startDate: '',
  endDate: '',
  description: ''
};

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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // mode: 'create' | 'edit'
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingPromotionId, setEditingPromotionId] = useState<string | null>(null);

  const [promotionForm, setPromotionForm] = useState({ ...emptyForm });

  // open create modal
  const openCreateModal = () => {
    setModalMode('create');
    setEditingPromotionId(null);
    setPromotionForm({ ...emptyForm });
    setIsModalOpen(true);
  };

  // open edit modal for a given promotion
  const openEditModal = (promotion: Promotion) => {
    setModalMode('edit');
    setEditingPromotionId(promotion.id);

    // parse the existing promotion into the form
    const discountType = promotion.discount.includes('%') ? 'percentage' : 'fixed';
    const discountValue = promotion.discount.replace(/[%$]/g, '');
    const minPurchaseValue = promotion.minPurchase.replace('$', '');

    const [startDateStr = '', endDateStr = ''] = (promotion.period || '').split(' - ');

    const parseToISO = (d: string) => {
      // expect format DD/MM/YYYY -> YYYY-MM-DD
      const parts = d.split('/');
      if (parts.length !== 3) return '';
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    setPromotionForm({
      name: promotion.name,
      code: promotion.code,
      discountType,
      discountValue,
      minPurchase: minPurchaseValue,
      startDate: parseToISO(startDateStr),
      endDate: parseToISO(endDateStr),
      description: ''
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode('create');
    setEditingPromotionId(null);
    setPromotionForm({ ...emptyForm });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPromotionForm(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('es-ES');
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!promotionForm.name || !promotionForm.code || !promotionForm.discountValue || !promotionForm.startDate || !promotionForm.endDate) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    const newPromotion: Promotion = {
      id: Date.now().toString(),
      code: promotionForm.code,
      name: promotionForm.name,
      discount: `${promotionForm.discountValue}${promotionForm.discountType === 'percentage' ? '%' : '$'}`,
      minPurchase: promotionForm.minPurchase ? `$${promotionForm.minPurchase}` : '$0.00',
      period: `${formatDate(promotionForm.startDate)} - ${formatDate(promotionForm.endDate)}`,
      uses: 0,
      status: 'inactive'
    };

    setPromotions(prev => [...prev, newPromotion]);
    closeModal();
    // optional: toast / alert
  };

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromotionId) return;

    if (!promotionForm.name || !promotionForm.code || !promotionForm.discountValue || !promotionForm.startDate || !promotionForm.endDate) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    setPromotions(prev => prev.map(p => {
      if (p.id !== editingPromotionId) return p;
      return {
        ...p,
        name: promotionForm.name,
        code: promotionForm.code,
        discount: `${promotionForm.discountValue}${promotionForm.discountType === 'percentage' ? '%' : '$'}`,
        minPurchase: promotionForm.minPurchase ? `$${promotionForm.minPurchase}` : '$0.00',
        period: `${formatDate(promotionForm.startDate)} - ${formatDate(promotionForm.endDate)}`
      };
    }));

    closeModal();
  };

  const deletePromotion = (id: string) => {
    if (confirm('¿Deseas eliminar esta promoción?')) {
      setPromotions(prev => prev.filter(p => p.id !== id));
    }
  };

  const togglePromotionStatus = (id: string) => {
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p));
  };

  // close modal with ESC
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboardHeader">
        <h2 className="dashboardTitle">Gestión de Promociones y Descuentos</h2>
        <p className="dashboardSubtitle">Crea y administra códigos promocionales</p>
      </header>

      <div className="promotionsActions" style={{ marginBottom: 16 }}>
        <button type="button" className="button buttonPrimary" onClick={openCreateModal}>
          Nueva Promoción
        </button>
      </div>

      <div className="tableSection">
        <table className="productTable" role="table">
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
            ) : promotions.map(promo => (
              <tr key={promo.id}>
                <td>{promo.code}</td>
                <td>{promo.name}</td>
                <td>{promo.discount}</td>
                <td>{promo.minPurchase}</td>
                <td>{promo.period}</td>
                <td>{promo.uses}</td>
                <td>
                  <button
                    type="button"
                    className={`status-button ${promo.status === 'active' ? 'active' : 'inactive'}`}
                    onClick={() => togglePromotionStatus(promo.id)}
                  >
                    {promo.status === 'active' ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="button buttonSecondary"
                    style={{ marginRight: 8 }}
                    onClick={() => openEditModal(promo)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="button buttonDanger"
                    onClick={() => deletePromotion(promo.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="promoModalOverlay" role="dialog" aria-modal="true">
          <div className="promoModal">

            <div className="promoModalHeader">
              <h3>{modalMode === 'edit' ? 'Editar Promoción' : 'Nueva Promoción'}</h3>
              <button className="promoCloseBtn" type="button" onClick={closeModal}>×</button>
            </div>

            <form onSubmit={modalMode === 'edit' ? handleSubmitUpdate : handleSubmitCreate}>
              <div className="promoGrid2">
                <div>
                  <label>Nombre</label>
                  <input
                    name="name"
                    value={promotionForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label>Código</label>
                  <input
                    name="code"
                    value={promotionForm.code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="promoSection">
                <label>Descripción</label>
                <input
                  name="description"
                  value={promotionForm.description}
                  onChange={handleInputChange}
                  placeholder="Descripción de la promoción"
                />
              </div>

              <div className="promoGrid2">
                <div>
                  <label>Tipo de Descuento</label>
                  <select name="discountType" value={promotionForm.discountType} onChange={handleInputChange}>
                    <option value="percentage">Porcentaje</option>
                    <option value="fixed">Valor</option>
                  </select>
                </div>

                <div>
                  <label>Compra Mínima ($)</label>
                  <input
                    name="minPurchase"
                    type="number"
                    step="0.01"
                    value={promotionForm.minPurchase}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="promoSection">
                <label>Descuento</label>
                <div className="promoDiscountBox">
                  <input
                    name="discountValue"
                    type="number"
                    step="0.01"
                    value={promotionForm.discountValue}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="promoSuffix">
                    {promotionForm.discountType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
              </div>

              <div className="promoGrid2">
                <div>
                  <label>Fecha de Inicio</label>
                  <input name="startDate" type="date" value={promotionForm.startDate} onChange={handleInputChange} required />
                </div>
                <div>
                  <label>Fecha de Fin</label>
                  <input name="endDate" type="date" value={promotionForm.endDate} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="promoModalFooter">
                <button type="button" className="promoBtnCancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="promoBtnConfirm">
                  {modalMode === 'edit' ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsDashboard;
