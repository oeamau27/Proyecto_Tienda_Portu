'use client';

import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: 'default' | 'warning' | 'success';
  responsive?: boolean;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  variant = 'default',
  responsive = true,
  className = ''
}) => {
  return (
    <div 
      className={`
        summaryCard 
        summaryCard-${variant}
        ${responsive ? 'summaryCard-responsive' : ''}
        ${className}
      `}
    >
      <h3 className="summaryCard-title">{title}</h3>
      <div className="summaryCard-value">{value}</div>
      {subtitle && <div className="summaryCard-subtitle">{subtitle}</div>}
    </div>
  );
};

export default SummaryCard;