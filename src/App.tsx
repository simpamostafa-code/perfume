import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Grid,
  Menu,
  Search,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CATEGORIES,
  COLLECTION_INFO,
  PERFUMES,
  type FragranceCategory,
  type PerfumeItem,
} from './data/perfumes';
import {
  filterPerfumes,
  findPerfumeById,
  findPerfumeIndexById,
  getNextPerfumeIndex,
  getPrevPerfumeIndex,
  resolveGalleryKeyAction,
} from './utils/galleryState';
import { StoneBackdrop } from './components/StoneBackdrop';
import { PerfumeAlcove } from './components/PerfumeAlcove';
import { PerfumeDetailView } from './components/PerfumeDetailView';
import { CollectionIndexDrawer } from './components/CollectionIndexDrawer';
import { PerfumeBottleVisual } from './components/PerfumeBottleVisual';

export default function App() {
  const [selectedPerfumeId, setSelectedPerfumeId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<FragranceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cinematic' | 'catalog'>('cinematic');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Filtered list based on active category and search
  const displayedPerfumes = useMemo(() => {
    return filterPerfumes(PERFUMES, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  // Ensure focused index stays within valid range
  const safeFocusedIndex =
    displayedPerfumes.length === 0
      ? 0
      : Math.min(focusedIndex, displayedPerfumes.length - 1);

  const selectedPerfume = findPerfumeById(PERFUMES, selectedPerfumeId);
  const selectedIndex = findPerfumeIndexById(PERFUMES, selectedPerfumeId);

  const activeGalleryIndex = hoveredIndex ?? safeFocusedIndex;
  const activePerfume =
    selectedPerfume ??
    displayedPerfumes[activeGalleryIndex] ??
    PERFUMES[0];

  const formattedIndex = String(activeGalleryIndex + 1).padStart(2, '0');
  const formattedTotal = String(displayedPerfumes.length).padStart(2, '0');

  // Open detail view for any perfume
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

  // Previous & Next navigation
  const handleNext = useCallback(() => {
    if (selectedPerfumeId) {
      const nextIdx = getNextPerfumeIndex(selectedIndex, PERFUMES.length);
      if (nextIdx >= 0) {
        setFocusedIndex(nextIdx);
        setSelectedPerfumeId(PERFUMES[nextIdx].id);
      }
      return;
    }
    if (displayedPerfumes.length > 0) {
      setFocusedIndex((prev) => getNextPerfumeIndex(prev, displayedPerfumes.length));
    }
  }, [selectedPerfumeId, selectedIndex, displayedPerfumes.length]);

  const handlePrev = useCallback(() => {
    if (selectedPerfumeId) {
      const prevIdx = getPrevPerfumeIndex(selectedIndex, PERFUMES.length);
      if (prevIdx >= 0) {
        setFocusedIndex(prevIdx);
        setSelectedPerfumeId(PERFUMES[prevIdx].id);
      }
      return;
    }
    if (displayedPerfumes.length > 0) {
      setFocusedIndex((prev) => getPrevPerfumeIndex(prev, displayedPerfumes.length));
    }
  }, [selectedPerfumeId, selectedIndex, displayedPerfumes.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // If typing in search box, don't trigger hotkeys
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

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
        const target = displayedPerfumes[safeFocusedIndex];
        if (target) {
          handleOpenPerfume(target.id);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    safeFocusedIndex,
    displayedPerfumes,
    handleNext,
    handleOpenPerfume,
    handlePrev,
    isDrawerOpen,
    selectedPerfumeId,
  ]);

  // Visible alcove slice in cinematic mode (desktop shows 5 alcoves at once)
  const pageSize = 5;
  const pageStart = Math.floor(safeFocusedIndex / pageSize) * pageSize;
  const cinematicSlice = useMemo(() => {
    if (displayedPerfumes.length <= pageSize) return displayedPerfumes;
    return displayedPerfumes.slice(pageStart, pageStart + pageSize);
  }, [displayedPerfumes, pageStart]);

  return (
    <div
      dir="rtl"
      data-view={selectedPerfume ? 'detail' : 'gallery'}
      className="relative min-h-screen w-full bg-[#030304] text-[#F5F3EF] selection:bg-white/20 selection:text-white"
    >
      {/* Stone background with reactive spotlight bloom */}
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
          className="animate-gallery-in relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col justify-between px-4 py-4 sm:px-7 sm:py-6 lg:px-10 lg:py-6"
        >
          {/* Top Bar: Brand, Search, Mode Toggle, Drawer trigger */}
          <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl tracking-wide text-[#F5F3EF] sm:text-2xl">
                  {COLLECTION_INFO.brandName}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-px w-6 bg-white/20 sm:inline-block"
                />
                <span className="hidden text-xs font-mono text-[#D4AF37] sm:inline-block">
                  {COLLECTION_INFO.brandEn}
                </span>
              </div>

              {/* View Switcher & Drawer trigger */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('cinematic')}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors ${
                      viewMode === 'cinematic'
                        ? 'bg-[#D4AF37] font-medium text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">العرض السينمائي</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('catalog')}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors ${
                      viewMode === 'catalog'
                        ? 'bg-[#D4AF37] font-medium text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Grid className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">الكتالوج الشامل</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="فتح فهرس العطور"
                  className="inline-flex min-h-[38px] cursor-pointer items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-[#D4AF37]/60 hover:text-white"
                >
                  <Menu className="h-4 w-4" aria-hidden="true" />
                  <span>الفهرس ({PERFUMES.length})</span>
                </button>
              </div>
            </div>

            {/* Filter Bar & Search Input */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Category tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setFocusedIndex(0);
                      }}
                      className={`cursor-pointer rounded-full px-3.5 py-1 text-xs whitespace-nowrap transition-all ${
                        isSelected
                          ? 'border border-[#D4AF37] bg-[#D4AF37]/15 font-medium text-[#D4AF37]'
                          : 'border border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-64 md:w-80">
                <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocusedIndex(0);
                  }}
                  placeholder="ابحث بالعطر، الدار (Dior...)، النوتة..."
                  className="w-full rounded-md border border-white/15 bg-white/[0.03] py-1.5 pr-8 pl-3 text-xs text-white placeholder-white/40 outline-none transition-colors focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </header>

          {/* MAIN VIEW: Cinematic Stone Alcoves vs Catalog Grid */}
          {displayedPerfumes.length === 0 ? (
            <div className="my-auto flex flex-col items-center justify-center py-20 text-center">
              <Sparkles className="h-10 w-10 text-white/20" />
              <h3 className="mt-4 font-display text-xl text-white/70">
                لم يتم العثور على عطور تطابق البحث
              </h3>
              <p className="mt-1 text-xs text-white/40">
                جرب البحث باسم دار أخرى (مثل: Dior, Chanel, Creed) أو تغيير الفئة
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-md border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-4 py-1.5 text-xs text-[#D4AF37] hover:bg-[#D4AF37]/20"
              >
                إعادة ضبط الفلتر
              </button>
            </div>
          ) : viewMode === 'cinematic' ? (
            /* Cinematic 3D Carved Stone Alcoves */
            <div className="flex flex-1 flex-col justify-center py-4">
              <main
                aria-label="معرض العطور السينمائي"
                data-testid="perfume-gallery-grid"
                className="grid w-full flex-1 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-6"
              >
                {cinematicSlice.map((perfume, idx) => {
                  const globalIdx = displayedPerfumes.findIndex(
                    (p) => p.id === perfume.id,
                  );
                  const isHovered = hoveredIndex === globalIdx;
                  const isActive =
                    isHovered ||
                    (hoveredIndex === null && safeFocusedIndex === globalIdx);
                  const isDimmed =
                    hoveredIndex !== null && hoveredIndex !== globalIdx;

                  return (
                    <PerfumeAlcove
                      key={perfume.id}
                      perfume={perfume}
                      index={idx}
                      isActive={isActive}
                      isHovered={isHovered}
                      isDimmed={isDimmed}
                      onFocusOrHover={() => {
                        setHoveredIndex(globalIdx);
                        setFocusedIndex(globalIdx);
                      }}
                      onBlurOrLeave={() => setHoveredIndex(null)}
                      onSelect={() => handleOpenPerfume(perfume.id)}
                    />
                  );
                })}
              </main>

              {/* Page Indicator for Cinematic view */}
              {displayedPerfumes.length > pageSize && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
                  <span>
                    عرض {pageStart + 1} -{' '}
                    {Math.min(pageStart + pageSize, displayedPerfumes.length)} من{' '}
                    {displayedPerfumes.length}
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Luxury Catalog Grid Mode */
            <main
              aria-label="كتالوج العطور الشامل"
              className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {displayedPerfumes.map((perfume) => (
                <div
                  key={perfume.id}
                  onClick={() => handleOpenPerfume(perfume.id)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0E] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-2xl"
                  style={{
                    boxShadow: `0 0 30px -15px rgba(${perfume.spotlightRgb}, 0.25)`,
                  }}
                >
                  {/* Top info */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#D4AF37]">
                      {perfume.brand}
                    </span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
                      {perfume.gender}
                    </span>
                  </div>

                  {/* Bottle Visual Stage */}
                  <div className="relative my-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-md bg-white/[0.02]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-20 blur-xl transition-opacity group-hover:opacity-40"
                      style={{
                        backgroundColor: `rgba(${perfume.spotlightRgb}, 0.6)`,
                      }}
                    />
                    <div className="relative aspect-[3/4] h-40">
                      <PerfumeBottleVisual
                        perfume={perfume}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Perfume Identity */}
                  <h3 className="font-display text-lg font-medium text-white transition-colors group-hover:text-[#D4AF37]">
                    {perfume.name}
                  </h3>
                  <span className="text-[11px] font-light text-white/50">
                    {perfume.nameEn} · {perfume.family}
                  </span>

                  {/* Key Notes */}
                  <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-white/60">
                    <span className="text-white/40">أبرز النوتات: </span>
                    <span>{perfume.notes.top}</span>
                  </div>

                  {/* Bottom Specs */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
                    <span>{perfume.concentration}</span>
                    <span>{perfume.volume}</span>
                  </div>
                </div>
              ))}
            </main>
          )}

          {/* Bottom Footer & Navigation Controls */}
          <footer className="flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.08] pt-4">
            <div className="flex items-baseline gap-4">
              <h1 className="font-display text-2xl leading-none font-normal italic text-[#F5F3EF] sm:text-3xl lg:text-[34px]">
                {COLLECTION_INFO.collectionTitle}
              </h1>
              <span
                aria-hidden="true"
                className="hidden h-px w-10 transition-colors duration-500 sm:inline-block"
                style={{ backgroundColor: activePerfume.spotlightColor }}
              />
              <span className="hidden text-xs font-light text-white/60 md:inline-block">
                {activePerfume.brand} · {activePerfume.name} ({activePerfume.nameEn})
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
