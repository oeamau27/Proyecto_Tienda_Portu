'use client';
import './InfoItem.css';

const InfoItem = ({ icon, label, value, secondary = false }) => (
  <div className="info-item">
    <span className={`icon icon-${icon}`}>
      {icon === 'user' ? '👤' :
       icon === 'username' ? '@' :
       icon === 'email' ? '✉️' :
       icon === 'phone' ? '📞' : ''}
    </span>

    <div className="info-content">
      <span className="label">{label}</span>
      <span className={`value ${secondary ? 'secondary' : ''}`}>{value}</span>
    </div>
  </div>
);

export default InfoItem;
