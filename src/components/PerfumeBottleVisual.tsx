import { useState } from 'react';
import type { PerfumeItem } from '../data/perfumes';

interface PerfumeBottleVisualProps {
  perfume: PerfumeItem;
  className?: string;
  priority?: boolean;
}

export function PerfumeBottleVisual({
  perfume,
  className = '',
  priority = false,
}: PerfumeBottleVisualProps) {
  const [useFallback, setUseFallback] = useState(false);

  // If local image fails or fallback requested, render bespoke luxury crystal bottle
  if (useFallback || !perfume.image) {
    return <LuxuryFlaconRender perfume={perfume} className={className} />;
  }

  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      {/* Soft spotlight halo directly beneath real bottle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 bottom-2 h-1/2 rounded-full blur-2xl opacity-40 transition-opacity"
        style={{
          backgroundColor: `rgba(${perfume.spotlightRgb}, 0.55)`,
        }}
      />

      <img
        src={perfume.image}
        alt={`زجاجة عطر ${perfume.name} الأصلية — ${perfume.brand}`}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setUseFallback(true)}
        className="pointer-events-none select-none h-full w-full max-h-full object-contain filter drop-shadow-[0_22px_35px_rgba(0,0,0,0.92)] brightness-[1.03] contrast-[1.05] transition-transform duration-300"
      />
    </div>
  );
}

/**
 * Custom Haute Parfumerie Flacon rendering tailored to brand silhouette & colors
 */
function LuxuryFlaconRender({
  perfume,
  className = '',
}: {
  perfume: PerfumeItem;
  className?: string;
}) {
  const style = perfume.flaconStyle ?? 'classic';

  return (
    <div
      role="img"
      aria-label={`زجاجة عطر ${perfume.name} من دار ${perfume.brand}`}
      className={`relative flex h-full w-full items-center justify-center select-none ${className}`}
    >
      <div className="relative flex h-[85%] w-[68%] max-w-[210px] flex-col items-center justify-end">
        {/* Glow ambient bloom from within the bottle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-4 h-3/5 rounded-full blur-2xl opacity-75"
          style={{
            backgroundColor: `rgba(${perfume.spotlightRgb}, 0.55)`,
          }}
        />

        {/* Cap (Stopper) */}
        {renderCap(style, perfume)}

        {/* Collar / Neck */}
        <div className="relative z-10 h-3 w-8 bg-gradient-to-r from-[#D4AF37] via-[#FFF3CC] to-[#AA820A] shadow-md ring-1 ring-black/40" />

        {/* Main Crystal Bottle Body */}
        <div
          className={`relative z-10 flex w-full flex-col items-center justify-between overflow-hidden border border-white/25 shadow-2xl backdrop-blur-md ${getBodyShape(
            style,
          )}`}
          style={{
            height: '75%',
            background: `linear-gradient(175deg, rgba(${perfume.spotlightRgb}, 0.35) 0%, rgba(10, 10, 14, 0.88) 45%, rgba(${perfume.spotlightRgb}, 0.5) 100%)`,
            boxShadow: `0 24px 60px -10px rgba(0,0,0,0.9), 0 0 45px -5px rgba(${perfume.spotlightRgb}, 0.45)`,
          }}
        >
          {/* Glass Specular highlights */}
          <div className="pointer-events-none absolute inset-y-0 left-2 w-3 bg-gradient-to-r from-white/40 to-transparent blur-[1px]" />
          <div className="pointer-events-none absolute inset-y-0 right-2 w-1.5 bg-gradient-to-l from-white/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/30 to-transparent" />

          {/* Liquid level wave */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-4/5 opacity-80"
            style={{
              background: `linear-gradient(to top, rgba(${perfume.spotlightRgb}, 0.65) 0%, rgba(${perfume.spotlightRgb}, 0.25) 75%, transparent 100%)`,
            }}
          />

          {/* Luxury Label Badge */}
          <div className="relative z-20 mx-auto my-auto flex w-[84%] flex-col items-center justify-center border border-[#D4AF37]/50 bg-black/85 px-2 py-3 text-center shadow-lg backdrop-blur-sm">
            <span className="text-[9px] font-semibold tracking-widest text-[#D4AF37] uppercase">
              {perfume.brandEn}
            </span>
            <div className="my-1 h-px w-6 bg-[#D4AF37]/60" />
            <h3 className="font-display text-sm font-medium tracking-wide text-white sm:text-base">
              {perfume.name}
            </h3>
            <span className="mt-0.5 text-[8px] tracking-wider text-white/60 uppercase">
              {perfume.nameEn}
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-[8px] text-white/45">
              <span>{perfume.concentration}</span>
              <span>·</span>
              <span>{perfume.volume}</span>
            </div>
          </div>

          {/* Heavy glass base */}
          <div className="relative z-10 h-4 w-full border-t border-white/20 bg-gradient-to-t from-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function renderCap(style: string, _perfume: PerfumeItem) {
  switch (style) {
    case 'chanel':
      return (
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-9 w-16 rounded-t-sm border border-white/20 bg-gradient-to-b from-neutral-900 via-black to-neutral-900 shadow-xl ring-1 ring-white/10 flex items-center justify-center">
            <span className="text-[10px] font-bold tracking-widest text-white/50">C</span>
          </div>
        </div>
      );
    case 'dior':
      return (
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-10 w-14 rounded-t-md border-b-2 border-[#D4AF37] bg-gradient-to-b from-neutral-800 to-black shadow-xl ring-1 ring-white/15 flex items-center justify-center">
            <span className="text-[9px] font-serif tracking-widest text-[#D4AF37]">CD</span>
          </div>
        </div>
      );
    case 'tom-ford':
      return (
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-11 w-14 rounded-t-sm border border-white/15 bg-neutral-950 shadow-2xl flex items-center justify-center">
            <div className="h-6 w-10 border border-[#D4AF37]/60 bg-[#D4AF37]/10 flex items-center justify-center">
              <span className="text-[8px] font-bold text-[#D4AF37]">TF</span>
            </div>
          </div>
        </div>
      );
    case 'baccarat':
      return (
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-8 w-12 rounded-t-sm bg-gradient-to-r from-[#D4AF37] via-[#FFF5D0] to-[#AA820A] shadow-xl flex items-center justify-center">
            <span className="text-[8px] font-serif font-black text-black/75">540</span>
          </div>
        </div>
      );
    case 'amouage':
      return (
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-10 w-14 rounded-t-full border border-[#D4AF37] bg-gradient-to-b from-[#E2B744] to-[#8C6D15] shadow-2xl flex items-center justify-center">
            <span className="text-[10px] text-black/80 font-bold">⚜</span>
          </div>
        </div>
      );
    case 'marly':
      return (
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-9 w-14 rounded-full border border-white/20 bg-gradient-to-r from-[#C0C0C0] via-white to-[#808080] shadow-xl flex items-center justify-center">
            <span className="text-[9px] font-bold text-neutral-800">1743</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-9 w-14 rounded-t-sm border border-white/15 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black shadow-xl ring-1 ring-white/10" />
        </div>
      );
  }
}

function getBodyShape(style: string): string {
  switch (style) {
    case 'chanel':
      return 'rounded-sm';
    case 'dior':
      return 'rounded-t-lg rounded-b-md';
    case 'tom-ford':
      return 'rounded-sm';
    case 'baccarat':
      return 'rounded-none border-2';
    case 'amouage':
      return 'rounded-t-xl rounded-b-lg';
    case 'marly':
      return 'rounded-t-2xl rounded-b-md';
    default:
      return 'rounded-md';
  }
}
