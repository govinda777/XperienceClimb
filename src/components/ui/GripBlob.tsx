'use client';

import React, { useEffect, useState } from 'react';

export function useParallax() {
  const [p, setP] = useState({ mx: 0, my: 0, sy: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setP(s => ({
        ...s,
        mx: e.clientX / w - 0.5,
        my: e.clientY / h - 0.5,
      }));
    };

    const onScroll = () => {
      setP(s => ({ ...s, sy: window.scrollY }));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return p;
}

interface GripBlobProps {
  className?: string;
  fill?: string;
  d?: string;
  label?: string;
  labelColor?: string;
  title?: string;
}

export function GripBlob({
  className = '',
  fill = '#e76f51',
  d,
  label,
  labelColor = '#ffffff',
  title,
}: GripBlobProps) {
  // SVG paths simulando agarras de escalada orgânicas (pinças, regletes, abaulados)
  const defaultPath =
    d ||
    'M100 8 C148 6, 196 36, 188 92 C180 148, 132 192, 78 188 C28 184, 4 138, 12 92 C20 44, 56 10, 100 8 Z';

  return (
    <div
      className={`relative select-none transition-transform duration-300 ease-out hover:scale-110 ${className}`}
      title={title}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
      >
        <path d={defaultPath} fill={fill} />
        <path d={defaultPath} fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" />
        {/* Textura sutil de rocha interna */}
        <ellipse
          cx="90"
          cy="75"
          rx="35"
          ry="15"
          fill="rgba(255, 255, 255, 0.12)"
          transform="rotate(-15 90 75)"
        />
      </svg>
      {label && (
        <span
          className="absolute inset-0 grid place-items-center font-mono font-black tracking-tighter"
          style={{ color: labelColor, fontSize: 'clamp(16px, 28%, 32px)' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
