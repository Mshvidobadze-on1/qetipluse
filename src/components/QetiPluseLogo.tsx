import React from 'react';

interface QetiPluseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const QetiPluseLogo: React.FC<QetiPluseLogoProps> = ({
  size = 'md',
  showTagline = true,
}) => {
  const iconDim =
    size === 'sm'
      ? 'w-9 h-9'
      : size === 'lg'
      ? 'w-12 h-12'
      : 'w-11 h-11';

  const textDim =
    size === 'sm'
      ? 'text-lg'
      : size === 'lg'
      ? 'text-2xl'
      : 'text-xl sm:text-[22px]';

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Custom 3D Geometric Brand Emblem */}
      <div
        className={`relative ${iconDim} rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2 shadow-lg shadow-indigo-500/30`}
      >
        {/* Outer Ambient Glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-75 blur-[6px] group-hover:opacity-100 transition-opacity" />

        {/* Main SVG Mark */}
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full rounded-2xl overflow-hidden"
        >
          <defs>
            <linearGradient id="qpBgGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#312E81" />
              <stop offset="45%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <linearGradient id="qpRingGrad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#E0E7FF" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="qpPlusGrad" x1="34" y1="10" x2="56" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Squircle Base */}
          <rect width="64" height="64" rx="16" fill="url(#qpBgGrad)" />

          {/* Glassmorphic Top Highlight */}
          <path
            d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V26C46 32 18 32 0 26V16Z"
            fill="white"
            fillOpacity="0.12"
          />

          {/* Inner Precision Border */}
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="14"
            stroke="white"
            strokeOpacity="0.24"
            strokeWidth="1.5"
          />

          {/* Geometric 'Q' Monogram Ring */}
          <path
            d="M30 15C20.6112 15 13 22.6112 13 32C13 41.3888 20.6112 49 30 49C34.25 49 38.135 47.44 41.11 44.86"
            stroke="url(#qpRingGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />

          {/* Dynamic 'Q' Tail + Lightning Slash */}
          <path
            d="M32 34L46 48"
            stroke="url(#qpRingGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />

          {/* Glowing 'Plus' (+) Tech Spark in Top-Right Quadrant */}
          <g>
            <circle cx="45" cy="21" r="10.5" fill="#090A0F" fillOpacity="0.35" />
            <path
              d="M45 14.5V27.5M38.5 21H51.5"
              stroke="url(#qpPlusGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Modern Brand Wordmark & Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span
            className={`${textDim} font-black tracking-tight text-slate-900 dark:text-white`}
          >
            Qeti
          </span>
          <span
            className={`${textDim} font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400`}
          >
            Pluse
          </span>
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 ml-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-xs leading-none">
            +
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wide text-slate-500 dark:text-slate-400 leading-none">
              ქეთი პლუსი • ტექნიკის ჰაბი
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
