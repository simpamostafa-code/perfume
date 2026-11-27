import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { COLLECTION_INFO, PERFUMES } from './data/perfumes';
import {
  findPerfumeById,
  findPerfumeIndexById,
  getMobileAlcoveColSpan,
  getNextPerfumeIndex,
  getPrevPerfumeIndex,
  resolveGalleryKeyAction,
} from './utils/galleryState';
import { StoneBackdrop } from './components/StoneBackdrop';
import { PerfumeAlcove } from './components/PerfumeAlcove';
import { PerfumeDetailView } from './components/PerfumeDetailView';
import { CollectionIndexDrawer } from './components/CollectionIndexDrawer';

export default function App() {
  const [selectedPerfumeId, setSelectedPerfumeId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const selectedPerfume = findPerfumeById(PERFUMES, selectedPerfumeId);
  const selectedIndex = findPerfumeIndexById(PERFUMES, selectedPerfumeId);

  const activeGalleryIndex = hoveredIndex ?? focusedIndex;
  const activePerfume = selectedPerfume ?? PERFUMES[activeGalleryIndex] ?? PERFUMES[0];
  const formattedIndex = String(activeGalleryIndex + 1).padStart(2, '0');
  const formattedTotal = String(PERFUMES.length).padStart(2, '0');

  const handleOpenPerfume = useCallback((id: string) => {
    const idx = findPerfumeIndexById(PERFUMES, id);
    setFocusedIndex(idx);
    setSelectedPerfumeId(id);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToGallery = useCallback(() => {
    setSelectedPerfumeId(null);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedPerfumeId) {
      const nextIdx = getNextPerfumeIndex(selectedIndex, PERFUMES.length);
      if (nextIdx >= 0) {
        setFocusedIndex(nextIdx);
        setSelectedPerfumeId(PERFUMES[nextIdx].id);
      }
      return;
    }
    setFocusedIndex((prev) => getNextPerfumeIndex(prev, PERFUMES.length));
  }, [selectedPerfumeId, selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedPerfumeId) {
      const prevIdx = getPrevPerfumeIndex(selectedIndex, PERFUMES.length);
      if (prevIdx >= 0) {
        setFocusedIndex(prevIdx);
        setSelectedPerfumeId(PERFUMES[prevIdx].id);
      }
      return;
    }
    setFocusedIndex((prev) => getPrevPerfumeIndex(prev, PERFUMES.length));
  }, [selectedPerfumeId, selectedIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const action = resolveGalleryKeyAction(event.key, {
        isDetailOpen: Boolean(selectedPerfumeId),
        isDrawerOpen,
        isRtl: true,
      });

      if (action.type === 'close') {
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
        } else if (selectedPerfumeId) {
          setSelectedPerfumeId(null);
        }
      } else if (action.type === 'next') {
        event.preventDefault();
        handleNext();
      } else if (action.type === 'prev') {
        event.preventDefault();
        handlePrev();
      } else if (action.type === 'open') {
        const activeTarget = document.activeElement;
        if (activeTarget && activeTarget.tagName === 'BUTTON') {
          return;
        }
        const target = PERFUMES[focusedIndex];
        if (target) {
          handleOpenPerfume(target.id);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    focusedIndex,
    handleNext,
    handleOpenPerfume,
    handlePrev,
    isDrawerOpen,
    selectedPerfumeId,
  ]);

  return (
    <div
      dir="rtl"
      data-view={selectedPerfume ? 'detail' : 'gallery'}
      className="relative min-h-screen w-full bg-[#030304] text-[#F5F3EF] selection:bg-white/20 selection:text-white"
    >
      {/* Deep pitch-black architectural monolith background */}
      <StoneBackdrop
        accentRgb={activePerfume.spotlightRgb}
        intensity={selectedPerfume ? 'detail' : 'gallery'}
      />

      {selectedPerfume ? (
        <PerfumeDetailView
          key="detail-view"
          perfume={selectedPerfume}
          currentIndex={selectedIndex}
          total={PERFUMES.length}
          onBack={handleBackToGallery}
          onPrev={handlePrev}
          onNext={handleNext}
          onOpenIndex={() => setIsDrawerOpen(true)}
        />
      ) : (
        <div
          key="gallery-view"
          className="animate-gallery-in relative z-10 mx-auto flex min-h-screen w-full max-w-[1520px] flex-col justify-between px-4 py-4 sm:px-7 sm:py-6 lg:h-screen lg:overflow-hidden lg:px-12 lg:py-7"
        >
          {/* Top Minimal Floating Bar */}
          <header className="flex items-center justify-between gap-4 pb-3 lg:pb-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl tracking-wide text-[#F5F3EF] sm:text-2xl">
                {COLLECTION_INFO.brandName}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px w-8 bg-white/20 sm:inline-block"
              />
              <span className="hidden text-xs font-light text-white/45 sm:inline-block">
                {COLLECTION_INFO.editionLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="فتح فهرس المجموعة"
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 text-xs font-medium text-white/75 transition-colors hover:text-white whitespace-nowrap shrink-0"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              <span>فهرس المجموعة</span>
            </button>
          </header>

          {/* Center Hero Stage:
              - Desktop (lg+): 5 separated carved rough-stone alcoves side by side with pure black spacing
              - Mobile (< lg): 2-over-3 architectural bento grid matching the iPhone in the reference video */}
          <main
            aria-label="معرض العطور الخمسة"
            data-testid="perfume-gallery-grid"
            className="grid w-full flex-1 grid-cols-6 grid-rows-2 gap-3 sm:gap-4 lg:h-full lg:min-h-0 lg:grid-cols-5 lg:grid-rows-1 lg:gap-6 xl:gap-8"
          >
            {PERFUMES.map((perfume, index) => {
              const isHovered = hoveredIndex === index;
              const isActive =
                isHovered || (hoveredIndex === null && focusedIndex === index);
              const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

              return (
                <PerfumeAlcove
                  key={perfume.id}
                  perfume={perfume}
                  index={index}
                  spanClass={getMobileAlcoveColSpan(index, PERFUMES.length)}
                  isActive={isActive}
                  isHovered={isHovered}
                  isDimmed={isDimmed}
                  onFocusOrHover={() => {
                    setHoveredIndex(index);
                    setFocusedIndex(index);
                  }}
                  onBlurOrLeave={() => setHoveredIndex(null)}
                  onSelect={() => handleOpenPerfume(perfume.id)}
                />
              );
            })}
          </main>

          {/* Bottom Architectural Collection Title & Simple Navigation Controls (matching video bottom corner title) */}
          <footer className="flex flex-wrap items-end justify-between gap-4 pt-4 sm:pt-5 lg:pt-6">
            <div className="flex items-baseline gap-4">
              <h1 className="font-display text-3xl leading-none font-normal italic text-[#F5F3EF] sm:text-4xl lg:text-[42px]">
                {COLLECTION_INFO.collectionTitle}
              </h1>
              <span
                aria-hidden="true"
                className="hidden h-px w-12 transition-colors duration-500 sm:inline-block"
                style={{ backgroundColor: activePerfume.spotlightColor }}
              />
              <span className="hidden text-xs font-light text-white/50 md:inline-block">
                {activePerfume.name} · {activePerfume.family}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="tabular-nums text-xs text-white/45">
                {formattedIndex} / {formattedTotal}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="العطر السابق"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-white/75 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="العطر التالي"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-white/75 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Slide-over Collection Index Drawer */}
      <CollectionIndexDrawer
        isOpen={isDrawerOpen}
        perfumes={PERFUMES}
        selectedId={selectedPerfumeId}
        onClose={() => setIsDrawerOpen(false)}
        onSelectPerfume={handleOpenPerfume}
      />
    </div>
  );
}
