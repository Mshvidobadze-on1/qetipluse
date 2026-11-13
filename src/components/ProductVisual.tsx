import React, { useState } from 'react';
import type { ProductVisualType } from '../types';

interface ProductVisualProps {
  type: ProductVisualType;
  imageUrl?: string;
  alt?: string;
  accentColor: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  type,
  imageUrl,
  alt = 'პროდუქტის ფოტო',
  accentColor,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const isTransparentCutout = Boolean(imageUrl && imageUrl.endsWith('.png'));

  const sizeClass =
    size === 'sm'
      ? `w-14 h-14 rounded-xl ${isTransparentCutout ? 'p-1' : ''}`
      : size === 'lg'
      ? `w-52 h-52 sm:w-64 sm:h-64 rounded-2xl ${isTransparentCutout ? 'p-3' : ''}`
      : `w-full h-full rounded-xl ${isTransparentCutout ? 'p-2' : ''}`;

  if (imageUrl && !imgError) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${sizeClass} ${className}`}>
        <div
          className="absolute inset-4 rounded-full blur-2xl opacity-20 dark:opacity-35 pointer-events-none"
          style={{ background: accentColor }}
        />
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          onError={() => setImgError(true)}
          className={
            isTransparentCutout
              ? 'relative z-10 w-full h-full object-contain object-center drop-shadow-[0_12px_20px_rgba(15,23,42,0.18)] transition-transform duration-300'
              : 'relative z-10 w-full h-full object-cover object-center rounded-xl transition-transform duration-300'
          }
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${sizeClass} ${className}`}>
      <div
        className="absolute inset-2 rounded-full blur-2xl opacity-30 dark:opacity-45 pointer-events-none"
        style={{ background: accentColor }}
      />
      <svg viewBox="0 0 120 120" className="w-24 h-24 relative z-10 drop-shadow-xl">
        <rect
          x="24"
          y="20"
          width="72"
          height="80"
          rx="14"
          fill="#0F172A"
          stroke={accentColor}
          strokeWidth="2"
        />
        <text x="60" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
          {type.toUpperCase()}
        </text>
      </svg>
    </div>
  );
};
