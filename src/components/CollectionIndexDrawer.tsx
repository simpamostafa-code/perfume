import { useState, useMemo } from 'react';
import { ArrowUpLeft, Search, X } from 'lucide-react';
import {
  CATEGORIES,
  COLLECTION_INFO,
  type FragranceCategory,
  type PerfumeItem,
} from '../data/perfumes';
import { filterPerfumes } from '../utils/galleryState';

interface CollectionIndexDrawerProps {
  isOpen: boolean;
  perfumes: readonly PerfumeItem[];
  selectedId: string | null;
  onClose: () => void;
  onSelectPerfume: (id: string) => void;
}

export function CollectionIndexDrawer({
  isOpen,
  perfumes,
  selectedId,
  onClose,
  onSelectPerfume,
}: CollectionIndexDrawerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<FragranceCategory>('all');

  const filteredPerfumes = useMemo(() => {
    return filterPerfumes(perfumes, activeCategory, search);
  }, [perfumes, activeCategory, search]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="فهرس موسوعة العطور العالمية"
      className="fixed inset-0 z-50 flex justify-start"
    >
      {/* Dimmed stone backdrop */}
      <div
        onClick={onClose}
        className="animate-gallery-in fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Slide-in Drawer Panel */}
      <div className="animate-editorial-in relative z-10 flex h-full w-full max-w-lg flex-col justify-between border-l border-white/10 bg-[#0B0B0F] px-6 py-6 shadow-2xl sm:px-8">
        <div className="flex h-full flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] tracking-wider text-[#D4AF37] uppercase">
                {COLLECTION_INFO.brandEn}
              </span>
              <h2 className="mt-0.5 font-display text-xl text-[#F5F3EF] sm:text-2xl">
                فهرس العطور العالمية
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق الفهرس"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white/35 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Search Box */}
          <div className="mt-4 relative">
            <Search className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالاسم، الدار (Dior, Creed...)، أو المكونات..."
              className="w-full rounded-md border border-white/15 bg-white/[0.04] py-2.5 pr-10 pl-4 text-xs text-white placeholder-white/40 outline-none transition-colors focus:border-[#D4AF37]/70 focus:bg-white/[0.08]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                مسح
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-[11px] whitespace-nowrap transition-colors ${isSelected
                      ? 'bg-[#D4AF37] font-medium text-black'
                      : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Perfume List */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-white/45">
            <span>النتائج: {filteredPerfumes.length} عطر</span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-[#D4AF37] hover:underline"
              >
                إلغاء الفلتر
              </button>
            )}
          </div>

          <nav
            aria-label="قائمة العطور العالمية"
            className="mt-3 flex-1 overflow-y-auto divide-y divide-white/[0.07] pr-1"
          >
            {filteredPerfumes.length === 0 ? (
              <div className="py-12 text-center text-sm text-white/40">
                لا توجد عطور تطابق بحثك حالياً
              </div>
            ) : (
              filteredPerfumes.map((perfume) => {
                const isCurrent = selectedId === perfume.id;
                return (
                  <button
                    key={perfume.id}
                    type="button"
                    onClick={() => {
                      onSelectPerfume(perfume.id);
                      onClose();
                    }}
                    className="group flex w-full cursor-pointer items-center justify-between py-3.5 text-right transition-colors hover:bg-white/[0.03] px-2 rounded-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className="h-10 w-[3px] rounded-full transition-all duration-300 group-hover:h-12"
                        style={{
                          backgroundColor: perfume.spotlightColor,
                          boxShadow: `0 0 14px rgba(${perfume.spotlightRgb}, 0.75)`,
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-white/45">
                          <span className="font-medium text-[#D4AF37]">
                            {perfume.brand}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{perfume.number}</span>
                          <span aria-hidden="true">·</span>
                          <span>{perfume.gender}</span>
                        </div>
                        <p
                          className={`mt-0.5 font-display text-lg sm:text-xl transition-colors ${isCurrent
                              ? 'text-white'
                              : 'text-[#F5F3EF]/90 group-hover:text-white'
                            }`}
                        >
                          {perfume.name}
                        </p>
                        <span className="text-[10px] text-white/50">
                          {perfume.nameEn} · {perfume.family}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white/45 group-hover:text-white/85">
                      <span className="hidden sm:inline text-[11px] font-mono">
                        {perfume.concentration}
                      </span>
                      <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </button>
                );
              })
            )}
          </nav>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/10 pt-4 text-center text-[10px] text-white/40">
          {COLLECTION_INFO.editionLabel}
        </div>
      </div>
    </div>
  );
}
