'use client';

import Header from '../components/Header';
import InfoSection from '../components/InfoSection';
import '../cuenta/CardCuenta.css';

import { useState } from 'react';

const CardEditar = ({ onClose }) => {
  const [nombre, setNombre] = useState('Administrator');
  const [usuario, setUsuario] = useState('admin');
  const [email, setEmail] = useState('admin@portu.com');
  const [telefono, setTelefono] = useState('No especificado');

  const handleSave = () => {
    console.log('Guardado:', { nombre, usuario, email, telefono });
    onClose();
  };

  return (
    <div className="card-container">
      <div className="card">
        <Header onClose={onClose} />

        <div className="card-body">
          <InfoSection title="Información Personal" hasButton={false}>
            <div className="info-item">
              <span className="icon">👤</span>
              <div className="info-content">
                <span className="label">Nombre Completo</span>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>

            <div className="info-item">
              <span className="icon">@</span>
              <div className="info-content">
                <span className="label">Nombre de Usuario</span>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
            </div>

            <div className="info-item">
              <span className="icon">✉️</span>
              <div className="info-content">
                <span className="label">Correo Electrónico</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="info-item">
              <span className="icon">📞</span>
              <div className="info-content">
                <span className="label">Teléfono</span>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
          </InfoSection>

          <div className="btn-group" style={{ marginTop: '16px' }}>
            <button className="btn btn-secondary" onClick={handleSave}>
              💾 Guardar
            </button>
            <button className="btn btn-secondary" onClick={onClose} style={{ marginLeft: '8px' }}>
              ❌ Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEditar;
