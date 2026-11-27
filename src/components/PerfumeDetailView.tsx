import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Menu, Sparkles, Clock, Calendar, ShieldCheck } from 'lucide-react';
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
      className="animate-gallery-in relative z-10 flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#030304]"
    >
      {/* Top Header */}
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
          <span>العودة للمعرض</span>
        </button>

        <div className="flex items-center gap-2.5">
          <span className="font-display text-lg tracking-wide text-white/90">
            {COLLECTION_INFO.brandName}
          </span>
          <span className="hidden text-xs text-[#D4AF37] sm:inline-block">
            {perfume.brandEn}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenIndex}
          aria-label="فتح فهرس العطور"
          className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 text-xs font-medium text-white/75 transition-colors duration-200 hover:text-white whitespace-nowrap shrink-0"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          <span>فهرس العطور ({total})</span>
        </button>
      </header>

      {/* Main Architectural Stage */}
      <main className="relative z-20 mx-auto grid w-full max-w-[1480px] flex-1 grid-cols-1 items-center gap-8 px-5 pb-8 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12 lg:pb-10">
        {/* Right Column in RTL: Perfume Details */}
        <div
          key={`copy-${perfume.id}`}
          className="animate-editorial-in order-2 flex flex-col items-start text-right lg:order-1 lg:col-span-5 lg:pl-6"
        >
          {/* Brand & Category badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-0.5 text-xs font-medium text-[#D4AF37]">
              {perfume.brand}
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-white/70">
              {perfume.categoryLabel}
            </span>
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/50">
              {perfume.gender}
            </span>
          </div>

          {/* Large Perfume Name & English Subtitle */}
          <div className="mt-4 flex w-full flex-col">
            <div className="flex w-full items-center gap-4">
              <h1 className="font-display shrink-0 text-[clamp(2.1rem,3.6vw,3.6rem)] leading-[1.1] font-normal text-[#F8F6F2]">
                {perfume.name}
              </h1>
              <span
                aria-hidden="true"
                style={{
                  background: `linear-gradient(270deg, ${perfume.spotlightColor} 0%, rgba(255,255,255,0.28) 65%, transparent 100%)`,
                }}
                className="animate-hairline-expand mt-1.5 h-[1px] min-w-[36px] flex-1"
              />
            </div>
            <span className="mt-1 font-serif text-sm tracking-wider text-white/50 uppercase sm:text-base">
              {perfume.nameEn}
            </span>
          </div>

          {/* Short Story / Description */}
          <p className="mt-4 max-w-lg text-sm leading-[1.9] font-light text-[#D5D2CB] sm:text-[15px]">
            {perfume.description}
          </p>

          {/* Olfactory Pyramid (الهرم العطري) */}
          <div className="mt-6 w-full max-w-lg rounded-lg border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>الهرم العطري والمكونات النادرة</span>
            </div>

            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="border-b border-white/5 pb-2 sm:border-b-0 sm:border-l sm:border-white/10 sm:pl-3">
                <dt className="text-[11px] font-medium text-white/45">مقدمة العطر (Top)</dt>
                <dd className="mt-1 text-xs leading-relaxed text-white/85">
                  {perfume.notes.top}
                </dd>
              </div>
              <div className="border-b border-white/5 pb-2 sm:border-b-0 sm:border-l sm:border-white/10 sm:pl-3">
                <dt className="text-[11px] font-medium text-white/45">قلب العطر (Heart)</dt>
                <dd className="mt-1 text-xs leading-relaxed text-white/85">
                  {perfume.notes.heart}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium text-white/45">قاعدة العطر (Base)</dt>
                <dd className="mt-1 text-xs leading-relaxed text-white/85">
                  {perfume.notes.base}
                </dd>
              </div>
            </dl>
          </div>

          {/* Season & Occasion badges */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{perfume.season}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>{perfume.timeOfDay}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>{perfume.concentration} · {perfume.volume}</span>
            </div>
          </div>
        </div>

        {/* Center Stage: Rough-Stone Niche with Bottle */}
        <div className="order-1 flex w-full items-center justify-center lg:order-2 lg:col-span-5 lg:h-full">
          <div className="stone-niche-frame animate-niche-expand relative flex h-[440px] w-full max-w-[340px] flex-col items-center justify-end overflow-hidden bg-[#0A0A0D] sm:h-[530px] sm:max-w-[390px] lg:h-[76vh] lg:max-h-[720px] lg:w-full lg:max-w-[450px]">
            {/* Illuminated Stone Wall */}
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

            {/* Spotlight Wash */}
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

            {/* Side Walls */}
            <span aria-hidden="true" className="stone-niche-side-left pointer-events-none absolute inset-y-0 left-0 w-5 sm:w-6" />
            <span aria-hidden="true" className="stone-niche-side-right pointer-events-none absolute inset-y-0 right-0 w-5 sm:w-6" />

            {/* Stone Shelf Floor */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
              style={{
                background: 'linear-gradient(to top, rgba(4,4,6,0.98) 0%, rgba(5,5,7,0.82) 48%, transparent 100%)',
              }}
            />

            {/* Colored Shelf Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 h-9 w-[72%] rounded-full blur-2xl transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${perfume.spotlightRgb}, 0.48) 0%, transparent 72%)`,
              }}
            />

            {/* Bottle Container */}
            <div className="relative mb-3 flex w-full items-end justify-center px-5 pb-5 sm:pb-7 lg:mb-5 lg:pb-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 h-[64%] w-[46%] rounded-full blur-xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(3,3,5,0.94) 0%, rgba(3,3,5,0.72) 52%, transparent 100%)',
                }}
              />

              <div className="relative aspect-[3/4] w-[78%] max-w-[260px] sm:max-w-[300px] lg:max-w-[350px]">
                {exitingBottle && (
                  <div
                    key={`exit-${exitingBottle.id}-${bottleState.transitionKey}`}
                    aria-hidden="true"
                    data-testid="exiting-bottle"
                    className="animate-bottle-fade-out pointer-events-none absolute inset-0 mix-blend-lighten"
                  >
                    <PerfumeBottleVisual perfume={exitingBottle} priority className="h-full w-full object-cover" />
                  </div>
                )}

                <div
                  key={`active-${activeBottle.id}-${bottleState.transitionKey}`}
                  data-testid="active-bottle"
                  className={`${isCrossfading ? 'animate-bottle-fade-in' : 'animate-bottle-arrive'} relative h-full w-full mix-blend-lighten`}
                >
                  <PerfumeBottleVisual perfume={activeBottle} priority className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column in RTL: Navigation Controls */}
        <div className="order-3 flex w-full items-center justify-between border-t border-white/[0.08] pt-4 lg:col-span-2 lg:h-full lg:flex-col lg:items-end lg:justify-between lg:border-t-0 lg:py-10 lg:pr-4">
          <div className="hidden text-left lg:block">
            <span className="text-[11px] tracking-wider text-white/40">
              {COLLECTION_INFO.collectionTitle}
            </span>
            <p className="mt-1 tabular-nums text-sm font-medium text-white/80">
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
              <span className="tabular-nums font-medium text-white/85">{formattedIndex}</span>
              <span aria-hidden="true">/</span>
              <span className="tabular-nums">{formattedTotal}</span>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="hidden cursor-pointer text-xs text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline lg:inline-block"
            >
              عرض الكتالوج الشامل
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
