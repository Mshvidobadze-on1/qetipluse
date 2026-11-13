import React from 'react';
import type { BrandName } from '../types';

interface BrandIconProps {
  brand: BrandName;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ brand, className = 'w-4 h-4' }) => {
  switch (brand) {
    case 'Apple':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.67-.81 1.12-1.94.99-3.07-.96.04-2.12.64-2.81 1.45-.61.71-1.15 1.86-1 2.97 1.07.08 2.15-.54 2.82-1.35Z" />
        </svg>
      );
    case 'Samsung':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10.5" ry="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <text x="12" y="14.2" textAnchor="middle" fontSize="5.2" fontWeight="800" letterSpacing="0.4">
            SAMSUNG
          </text>
        </svg>
      );
    case 'Sony':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <text x="12" y="14.5" textAnchor="middle" fontSize="6.5" fontWeight="900" letterSpacing="0.6">
            SONY
          </text>
        </svg>
      );
    case 'ASUS':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 4L3 19h4.2l1.8-3.2h6l1.8 3.2H21L12 4zm-1.4 8.8L12 10.2l1.4 2.6h-2.8z" />
        </svg>
      );
    case 'Dyson':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
          <circle cx="12" cy="10" r="6" />
          <path d="M12 16v5M9 21h6" strokeLinecap="round" />
        </svg>
      );
    case 'Xiaomi':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <rect x="2.5" y="3.5" width="19" height="17" rx="5" fill="#FF6900" />
          <path
            d="M7.5 16V9.8c0-.7.5-1.3 1.3-1.3h3.6c.8 0 1.4.6 1.4 1.4V16h-1.8v-5.6H9.3V16H7.5zm2.7-3.5h1.5V16h-1.5v-3.5zm5.2-4h1.8V16h-1.8V8.5z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'Google':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 15.65 5 12c0-3.65 3.36-7.27 7.19-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" />
        </svg>
      );
    case 'LG':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6h4" strokeLinecap="round" />
          <circle cx="9" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'Marshall':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M4 18V6l4.5 6.5L12 7l3.5 5.5L20 6v12h-2.5v-6.5L15 15.2l-3-4.7-3 4.7-2.5-3.7V18H4z" />
        </svg>
      );
    case 'Nintendo':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
          <rect x="3" y="5" width="8" height="14" rx="4" />
          <rect x="13" y="5" width="8" height="14" rx="4" />
          <circle cx="7" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'DJI':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="900" fontStyle="italic">
            DJI
          </text>
        </svg>
      );
    case 'Canon':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'GoPro':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="12" r="3" />
        </svg>
      );
    case 'Garmin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <polygon points="12,4 21,19 3,19" />
        </svg>
      );
    case 'JBL':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <text x="12" y="15" textAnchor="middle" fontSize="7.5" fontWeight="900">
            JBL
          </text>
        </svg>
      );
    default:
      return null;
  }
};
