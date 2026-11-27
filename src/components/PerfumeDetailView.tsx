import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import {
  COLLECTION_INFO,
  PERFUMES,
  STONE_TEXTURE_IMAGE,
  type PerfumeItem,
} from '../data/perfumes';
import {
  completeBottleTransition,
  findPerfumeById,
  nextBottleTransition,
  type BottleTransitionState,
} from '../utils/galleryState';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';

interface PerfumeDetailViewProps {
  perfume: PerfumeItem;
  currentIndex: number;
  total: number;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenIndex: () => void;
}

const FADE_OUT_DURATION_MS = 460;

export function PerfumeDetailView({
  perfume,
  currentIndex,
  total,
  onBack,
  onPrev,
  onNext,
  onOpenIndex,
}: PerfumeDetailViewProps) {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  const [bottleState, setBottleState] = useState<BottleTransitionState>(() => ({
    activeId: perfume.id,
    exitingId: null,
    transitionKey: 0,
  }));
  const clearTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setBottleState((prev) => nextBottleTransition(prev, perfume.id));

    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
    }

    clearTimerRef.current = window.setTimeout(() => {
      setBottleState((prev) => completeBottleTransition(prev));
      clearTimerRef.current = null;
    }, FADE_OUT_DURATION_MS);

    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
    };
  }, [perfume.id]);

  const activeBottle = findPerfumeById(PERFUMES, bottleState.activeId) ?? perfume;
  const exitingBottle = findPerfumeById(PERFUMES, bottleState.exitingId);
  const isCrossfading = bottleState.transitionKey > 0;

  return (
    <section
      aria-label={`تفاصيل عطر ${perfume.name}`}
      data-testid="perfume-detail-view"
      data-transitioning={exitingBottle ? 'true' : 'false'}
      className="animate-gallery-in relative z-10 flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#030304]"
    >
      {/* Top Minimal Architectural Header */}
      <header className="relative z-30 flex items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12 lg:py-6">
        <button
          type="button"
          onClick={onBack}
          data-testid="back-to-home-btn"
          className="group inline-flex min-h-[42px] cursor-pointer items-center gap-2.5 text-sm font-normal text-white/80 transition-colors duration-200 hover:text-white whitespace-nowrap shrink-0"
        >
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
          <span>العودة للرئيسية</span>
        </button>

        <span className="font-display text-lg tracking-wide text-white/85">
          {COLLECTION_INFO.brandName}
        </span>

        <button
          type="button"
          onClick={onOpenIndex}
          aria-label="فتح فهرس المجموعة"
          className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 text-xs font-medium text-white/75 transition-colors duration-200 hover:text-white whitespace-nowrap shrink-0"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          <span>الفهرس</span>
        </button>
      </header>

      {/* Main Architectural Stage matching the video */}
      <main className="relative z-20 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-6 px-5 pb-6 sm:px-8 lg:grid-cols-12 lg:gap-0 lg:px-12 lg:pb-8">
        {/* Right Column in RTL: Large Perfume Name + Thin Horizontal Line + Concise Description */}
        <div
          key={`copy-${perfume.id}`}
          className="animate-editorial-in order-2 flex flex-col items-start text-right lg:order-1 lg:col-span-4 lg:pl-8"
        >
          {/* Quiet unboxed family & light cue */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-wide text-white/45">
            <span className="tabular-nums font-medium text-white/75">
              {perfume.number}
            </span>
            <span aria-hidden="true">·</span>
            <span>{perfume.family}</span>
          </div>

          {/* Large Elegant Perfume Name + Thin Horizontal Line Right Beside It */}
          <div className="mt-3 flex w-full items-center gap-4 sm:gap-5">
            <h1 className="font-display shrink-0 text-[clamp(2.2rem,3.9vw,3.75rem)] leading-[1.1] font-normal text-[#F8F6F2] [text-wrap:balance]">
              {perfume.name}
            </h1>
            <span
              aria-hidden="true"
              style={{
                background: `linear-gradient(270deg, ${perfume.spotlightColor} 0%, rgba(255,255,255,0.28) 65%, transparent 100%)`,
              }}
              className="animate-hairline-expand mt-1.5 h-[1px] min-w-[44px] flex-1"
            />
          </div>

          {/* Short Poetic Fragrance Description */}
          <p className="mt-4 max-w-md text-sm leading-[1.85] font-light text-[#CFCCC6] sm:text-[15px]">
            {perfume.description}
          </p>

          {/* Compact Unboxed Olfactory Pyramid */}
          <dl className="mt-6 grid w-full max-w-md grid-cols-3 gap-3 border-t border-white/10 pt-5">
            <div>
              <dt className="text-[11px] font-medium text-white/40">المقدمة</dt>
              <dd className="mt-1 text-xs leading-relaxed font-light text-white/80">
                {perfume.notes.top}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium text-white/40">القلب</dt>
              <dd className="mt-1 text-xs leading-relaxed font-light text-white/80">
                {perfume.notes.heart}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium text-white/40">القاعدة</dt>
              <dd className="mt-1 text-xs leading-relaxed font-light text-white/80">
                {perfume.notes.base}
              </dd>
            </div>
          </dl>

          {/* Quiet Unboxed Specs */}
          <div className="mt-5 flex items-center gap-2.5 text-[11px] text-white/45">
            <span>{perfume.concentration}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{perfume.volume}</span>
            <span aria-hidden="true">·</span>
            <span>{perfume.lightLabel}</span>
          </div>
        </div>

        {/* Center Stage: Stationary Monumental Carved Rough-Stone Niche with Cinematic Bottle Fade-In / Fade-Out */}
        <div className="order-1 flex w-full items-center justify-center lg:order-2 lg:col-span-5 lg:h-full">
          <div className="stone-niche-frame animate-niche-expand relative flex h-[430px] w-full max-w-[330px] flex-col items-center justify-end overflow-hidden bg-[#0A0A0D] sm:h-[520px] sm:max-w-[380px] lg:h-[78vh] lg:max-h-[730px] lg:w-full lg:max-w-[460px]">
            {/* Illuminated Rough Carved Basalt Stone Wall */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${STONE_TEXTURE_IMAGE})`,
                filter: 'contrast(1.42) brightness(1.06)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 92% 76% at 50% 24%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.62) 56%, rgba(0,0,0,0.12) 96%)',
                maskImage:
                  'radial-gradient(ellipse 92% 76% at 50% 24%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.62) 56%, rgba(0,0,0,0.12) 96%)',
              }}
            />

            {/* Concentrated Overhead Spotlight & Smoothly Crossfading Color Wash */}
            <div
              key={`spotlight-${perfume.id}`}
              aria-hidden="true"
              className="animate-spotlight-bloom pointer-events-none absolute inset-0 transition-opacity duration-700"
              style={{
                background: `
                  radial-gradient(ellipse 46% 18% at 50% 0%, rgba(255, 255, 255, 0.72) 0%, rgba(${perfume.spotlightRgb}, 0.48) 52%, transparent 100%),
                  radial-gradient(ellipse 88% 60% at 50% 20%, rgba(${perfume.spotlightRgb}, 0.36) 0%, rgba(${perfume.spotlightRgb}, 0.14) 52%, transparent 86%)
                `,
              }}
            />

            {/* 3D Carved Vertical Recessed Side Walls */}
            <span
              aria-hidden="true"
              className="stone-niche-side-left pointer-events-none absolute inset-y-0 left-0 w-5 sm:w-6 lg:w-7"
            />
            <span
              aria-hidden="true"
              className="stone-niche-side-right pointer-events-none absolute inset-y-0 right-0 w-5 sm:w-6 lg:w-7"
            />

            {/* Dark Reflective Stone Shelf Floor */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
              style={{
                background:
                  'linear-gradient(to top, rgba(4,4,6,0.98) 0%, rgba(5,5,7,0.82) 48%, transparent 100%)',
              }}
            />

            {/* Subtle Colored Shelf Glow Beneath the Bottle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 h-9 w-[72%] rounded-full blur-2xl transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${perfume.spotlightRgb}, 0.48) 0%, transparent 72%)`,
              }}
            />

            {/* Cinematic Crossfade Stage for Outgoing (Fade-Out) & Incoming (Fade-In) Perfume Bottles */}
            <div className="relative mb-3 flex w-full items-end justify-center px-5 pb-5 sm:pb-7 lg:mb-5 lg:pb-8">
              {/* Soft tight dark occlusion behind solid bottle silhouette so matte cap & label stay crisp black */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 h-[64%] w-[46%] rounded-full blur-xl"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(3,3,5,0.94) 0%, rgba(3,3,5,0.72) 52%, transparent 100%)',
                }}
              />

              {/* Stacked Bottle Container allowing true overlapping Fade-Out & Fade-In */}
              <div className="relative aspect-[3/4] w-[78%] max-w-[260px] sm:max-w-[300px] lg:max-w-[350px]">
                {/* Outgoing Perfume Bottle (Cinematic Fade-Out) */}
                {exitingBottle && (
                  <div
                    key={`exit-${exitingBottle.id}-${bottleState.transitionKey}`}
                    aria-hidden="true"
                    data-testid="exiting-bottle"
                    className="animate-bottle-fade-out pointer-events-none absolute inset-0 mix-blend-lighten"
                  >
                    <PerfumeBottleVisual
                      perfume={exitingBottle}
                      priority
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Incoming / Active Perfume Bottle (Cinematic Fade-In on navigation, smooth Arrival on first open) */}
                <div
                  key={`active-${activeBottle.id}-${bottleState.transitionKey}`}
                  data-testid="active-bottle"
                  className={`${
                    isCrossfading
                      ? 'animate-bottle-fade-in'
                      : 'animate-bottle-arrive'
                  } relative h-full w-full mix-blend-lighten`}
                >
                  <PerfumeBottleVisual
                    perfume={activeBottle}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column in RTL: Balance & Prev/Next Controls */}
        <div className="order-3 flex w-full items-center justify-between border-t border-white/[0.08] pt-4 lg:col-span-3 lg:h-full lg:flex-col lg:items-end lg:justify-between lg:border-t-0 lg:py-10 lg:pr-8 lg:pt-10">
          <div className="hidden text-left lg:block">
            <span className="text-[11px] tracking-wider text-white/40">
              {COLLECTION_INFO.collectionTitle}
            </span>
            <p className="mt-1 tabular-nums text-xs text-white/65">
              {formattedIndex} / {formattedTotal}
            </p>
          </div>

          <div className="flex w-full items-center justify-between lg:w-auto lg:flex-col lg:items-end lg:gap-4">
            <div className="flex items-center gap-2 lg:order-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label="العطر السابق"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-white/75 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="العطر التالي"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-white/75 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/50 lg:order-1 lg:hidden">
              <span className="tabular-nums font-medium text-white/85">
                {formattedIndex}
              </span>
              <span aria-hidden="true">/</span>
              <span className="tabular-nums">{formattedTotal}</span>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="hidden cursor-pointer text-xs text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline lg:inline-block"
            >
              عرض جميع العطور
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
