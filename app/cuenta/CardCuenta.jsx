'use client';

import Header from '../components/Header';
import InfoSection from '../components/InfoSection';
import InfoItem from '../components/InfoItem';
import '../cuenta/CardCuenta.css';

const AccountInfoBox = () => (
  <div className="account-info-box">
    <h4>Información de la Cuenta</h4>
    <div className="info-box-item">
      <span className="info-box-label">Tipo de cliente:</span>
      <span className="info-box-value">Administrador</span>
    </div>
    <div className="info-box-item">
      <span className="info-box-label">ID de usuario:</span>
      <span className="info-box-value">admin-1</span>
    </div>
  </div>
);

const CardCuenta = ({ onClose = () => {}, onEdit = () => {} }) => {
  return (
    <div className="card-container">
      <div className="card">
        <Header onClose={onClose} onEdit={onEdit} />
        
        <div className="card-body">
          <InfoSection 
            title="Información Personal" 
            hasButton={true}
            onEdit={onEdit}
          >
            <InfoItem icon="user" label="Nombre Completo" value="Administrator" />
            <InfoItem icon="username" label="Nombre de Usuario" value="admin" />
            <InfoItem icon="email" label="Correo Electrónico" value="admin@portu.com" />
            <InfoItem icon="phone" label="Teléfono" value="No especificado" secondary={true} />
          </InfoSection>

          <AccountInfoBox />
        </div>
      </div>
    </div>
  );
};

export default CardCuenta;