// components/Badge.tsx
'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'danger' | 'success';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className = '',
  size = 'md',
  responsive = true
}) => {
  return (
    <span 
      className={`
        badge 
        badge-${variant} 
        badge-${size}
        ${responsive ? 'badge-responsive' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;