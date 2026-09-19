# Boulder Styles Reference (Extraído de AcademiaBoulder)

Este documento contém os padrões exatos de código CSS, SVG e utilitários extraídos de `AcademiaBoulder` para aplicação direta em seções do `XperienceClimb`.

---

## 1. Agarras Flutuantes (GripBlobs SVG) com Parallax

```tsx
import { useEffect, useState } from 'react';

export function useParallax() {
  const [p, setP] = useState({ mx: 0, my: 0, sy: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth,
        h = window.innerHeight;
      setP(s => ({ ...s, mx: e.clientX / w - 0.5, my: e.clientY / h - 0.5 }));
    };
    const onScroll = () => setP(s => ({ ...s, sy: window.scrollY }));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return p;
}

export function GripBlob({
  className = '',
  fill = '#1E88E5',
  d,
  label,
  labelColor = '#0F1116',
}: {
  className?: string;
  fill?: string;
  d?: string;
  label?: string;
  labelColor?: string;
}) {
  const defaultPath =
    d ||
    'M100 8 C148 6, 196 36, 188 92 C180 148, 132 192, 78 188 C28 184, 4 138, 12 92 C20 44, 56 10, 100 8 Z';

  return (
    <div className={`relative select-none ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        <path d={defaultPath} fill={fill} />
        <path d={defaultPath} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      </svg>
      {label && (
        <span
          className="absolute inset-0 grid place-items-center font-mono font-black tracking-tighter"
          style={{ color: labelColor, fontSize: 'clamp(18px, 30%, 36px)' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
```

---

## 2. Efeito Grain (Ruído Analógico SVG)

Adicionado via classe `.grain` ou `.grain-light`:

```css
/* No globals.css */
.grain::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  opacity: 0.18;
  mix-blend-mode: multiply;
  z-index: 1;
}
```

---

## 3. Stroke Text (Texto Vazado)

```css
.stroke-text-light {
  -webkit-text-stroke: 1.5px rgba(250, 250, 247, 0.9);
  color: transparent;
}
.stroke-text-azul {
  -webkit-text-stroke: 1.5px #1e88e5;
  color: transparent;
}
.stroke-text-dark {
  -webkit-text-stroke: 1.5px #0f1116;
  color: transparent;
}
```

---

## 4. Header de Seção Editorial Padrão

```tsx
export function SectionHeader({
  chapter = 'CAP · 01',
  tag = 'EXPERIÊNCIA',
  title = 'SUPERE SEUS LIMITES',
  subtitle,
}: {
  chapter?: string;
  tag?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#1E88E5] uppercase mb-3">
        <span>{chapter}</span>
        <span className="opacity-40">/</span>
        <span>{tag}</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```
