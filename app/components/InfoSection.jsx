import './InfoSection.css';

const InfoSection = ({ title, children, hasButton = false, onEdit }) => (
  <div className="info-section">
    <div className="section-header">
      <h3>{title}</h3>
      {hasButton && (
        <button className="btn btn-secondary" onClick={onEdit}>
          ✏️ Editar
        </button>
      )}
    </div>
    <div className="section-content">
      {children}
    </div>
  </div>
);

export default InfoSection;