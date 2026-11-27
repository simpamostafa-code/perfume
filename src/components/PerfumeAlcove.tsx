import { STONE_TEXTURE_IMAGE, type PerfumeItem } from '../data/perfumes';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';

interface PerfumeAlcoveProps {
  perfume: PerfumeItem;
  index: number;
  spanClass?: string;
  isActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onFocusOrHover: () => void;
  onBlurOrLeave: () => void;
  onSelect: () => void;
}

export function PerfumeAlcove({
  perfume,
  index,
  spanClass = 'col-span-3 lg:col-span-1',
  isActive,
  isHovered,
  isDimmed,
  onFocusOrHover,
  onBlurOrLeave,
  onSelect,
}: PerfumeAlcoveProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onFocusOrHover}
      onMouseLeave={onBlurOrLeave}
      onFocus={onFocusOrHover}
      onBlur={onBlurOrLeave}
      aria-label={`عرض تفاصيل عطر ${perfume.name} — دار ${perfume.brand}`}
      data-testid={`alcove-${perfume.id}`}
      style={{ animationDelay: `${(index % 5) * 65}ms` }}
      className={`stone-niche-frame animate-alcove-rise group relative flex h-full min-h-[280px] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-[#0A0A0D] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${spanClass} lg:min-h-0 ${
        isDimmed ? 'opacity-65' : 'opacity-100'
      }`}
    >
      {/* Layer 1: Tactile Rough Carved Basalt Stone Back Wall lit from above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
        style={{
          backgroundImage: `url(${STONE_TEXTURE_IMAGE})`,
          filter: isActive
            ? 'contrast(1.38) brightness(0.95)'
            : 'contrast(1.32) brightness(0.76)',
          WebkitMaskImage:
            'radial-gradient(ellipse 92% 76% at 50% 24%, rgba(0,0,0,1) 16%, rgba(0,0,0,0.58) 54%, rgba(0,0,0,0.12) 96%)',
          maskImage:
            'radial-gradient(ellipse 92% 76% at 50% 24%, rgba(0,0,0,1) 16%, rgba(0,0,0,0.58) 54%, rgba(0,0,0,0.12) 96%)',
        }}
      />

      {/* Layer 2: Focused Overhead Recessed Downlight + Colored Spotlight Wash across the stone wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: isActive ? 1 : 0.84,
          background: `
            radial-gradient(ellipse 42% 16% at 50% 0%, rgba(255, 255, 255, ${isActive ? 0.62 : 0.44}) 0%, rgba(${perfume.spotlightRgb}, ${isActive ? 0.42 : 0.28}) 52%, transparent 100%),
            radial-gradient(ellipse 84% 58% at 50% 18%, rgba(${perfume.spotlightRgb}, ${isActive ? 0.34 : 0.22}) 0%, rgba(${perfume.spotlightRgb}, ${isActive ? 0.12 : 0.06}) 52%, transparent 86%)
          `,
        }}
      />

      {/* Layer 3: 3D Recessed Architectural Vertical Side Walls */}
      <span
        aria-hidden="true"
        className="stone-niche-side-left pointer-events-none absolute inset-y-0 left-0 w-3 sm:w-4 lg:w-5"
      />
      <span
        aria-hidden="true"
        className="stone-niche-side-right pointer-events-none absolute inset-y-0 right-0 w-3 sm:w-4 lg:w-5"
      />

      {/* Top Brand Tag Indicator */}
      <div className="pointer-events-none absolute top-3 inset-x-3 z-10 flex items-center justify-between text-[10px] text-white/50">
        <span className="font-mono text-[9px] tracking-widest text-[#D4AF37]/90 uppercase">
          {perfume.brandEn}
        </span>
        <span className="tabular-nums text-white/40">{perfume.number}</span>
      </div>

      {/* Recessed top ceiling shadow lip & dark stone shelf floor gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
        style={{
          background:
            'linear-gradient(to top, rgba(4,4,6,0.98) 0%, rgba(5,5,7,0.82) 48%, transparent 100%)',
        }}
      />

      {/* Soft colored shelf glow right under the bottle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 h-7 w-[72%] rounded-full blur-xl transition-opacity duration-500 lg:bottom-5"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${perfume.spotlightRgb}, ${isActive ? 0.42 : 0.24}) 0%, transparent 72%)`,
        }}
      />

      {/* Bottle Resting Solidly on the Lower Half of the Carved Stone Chamber */}
      <div className="relative mb-2 flex w-full items-end justify-center px-1 pb-2 sm:px-2 sm:pb-4 lg:mb-4 lg:px-2 lg:pb-6">
        {/* Tight dark core occlusion behind the bottle silhouette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 h-[62%] w-[48%] rounded-full blur-xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(3,3,5,0.92) 0%, rgba(3,3,5,0.68) 52%, transparent 100%)',
          }}
        />

        {/* 3:4 Bottle Container */}
        <div
          className="relative aspect-[3/4] w-[88%] max-w-[165px] mix-blend-lighten transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:max-w-[195px] lg:max-w-[235px]"
          style={{
            transform: isHovered
              ? 'translateY(-7px) scale(1.055)'
              : isActive
                ? 'translateY(-3px) scale(1.02)'
                : 'translateY(0) scale(1)',
          }}
        >
          <PerfumeBottleVisual
            perfume={perfume}
            priority={index < 5}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Brand & Name Footer Overlay */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center bg-gradient-to-t from-black/95 via-black/60 to-transparent px-2 pt-8 pb-3 transition-all duration-300 ${
          isHovered
            ? 'translate-y-0 opacity-100'
            : 'translate-y-1 opacity-90 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'
        }`}
      >
        <span
          className="mb-1 h-px w-8"
          style={{ backgroundColor: perfume.spotlightColor }}
        />
        <span className="text-[10px] font-light text-[#D4AF37] tracking-wider">
          {perfume.brand}
        </span>
        <span className="font-display text-base leading-tight text-[#F8F6F2] sm:text-lg">
          {perfume.name}
        </span>
        <span className="text-[10px] text-white/50">{perfume.family}</span>
      </div>
    </button>
  );
}
