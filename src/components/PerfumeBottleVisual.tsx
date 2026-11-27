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
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={`زجاجة عطر ${perfume.name}`}
        className={`relative flex items-center justify-center ${className}`}
      >
        <div
          className="flex h-4/5 w-3/5 flex-col items-center justify-center rounded-sm border border-white/10"
          style={{
            background: `linear-gradient(180deg, rgba(${perfume.spotlightRgb}, 0.28) 0%, rgba(16,16,20,0.92) 100%)`,
            boxShadow: `0 24px 48px -12px rgba(${perfume.spotlightRgb}, 0.35)`,
          }}
        >
          <div className="mb-3 h-7 w-10 rounded-t-sm bg-zinc-900/95 ring-1 ring-white/15" />
          <div className="flex h-36 w-24 flex-col items-center justify-center rounded-sm border border-white/15 bg-black/45 px-2 text-center">
            <span className="font-display text-sm text-[#F5F3EF]">
              {perfume.name}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={perfume.image}
      alt={`زجاجة عطر ${perfume.name} — ${perfume.lightLabel}`}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={`bottle-feather-mask pointer-events-none select-none object-contain mix-blend-lighten brightness-[1.04] contrast-[1.06] ${className}`}
    />
  );
}
