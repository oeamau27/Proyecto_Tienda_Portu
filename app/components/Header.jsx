import './Header.css';

const Header = ({ onClose, onEdit }) => (
  <div className="header">
    <div className="header-content">
      <h2>Mi Cuenta</h2>
      <p className="subtitle">Administra tus datos personales y de cuenta.</p>
    </div>
    <button className="close-btn" onClick={onClose}>
      ✕
    </button>
  </div>
);

export default Header;