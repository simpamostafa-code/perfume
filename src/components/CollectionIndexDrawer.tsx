import { ArrowUpLeft, X } from 'lucide-react';
import { COLLECTION_INFO, type PerfumeItem } from '../data/perfumes';

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
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="فهرس مجموعة العطور"
      className="fixed inset-0 z-50 flex justify-start"
    >
      {/* Dimmed stone backdrop */}
      <div
        onClick={onClose}
        className="animate-gallery-in fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Slide-in Drawer Panel */}
      <div className="animate-editorial-in relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-white/10 bg-[#0B0B0F] px-7 py-8 shadow-2xl">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <p className="text-xs text-white/45">{COLLECTION_INFO.brandName}</p>
              <h2 className="mt-1 font-display text-2xl text-[#F5F3EF]">
                {COLLECTION_INFO.collectionTitle}
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

          <nav
            aria-label="قائمة العطور الخمسة"
            className="mt-6 divide-y divide-white/[0.07]"
          >
            {perfumes.map((perfume) => {
              const isCurrent = selectedId === perfume.id;
              return (
                <button
                  key={perfume.id}
                  type="button"
                  onClick={() => onSelectPerfume(perfume.id)}
                  className="group flex w-full cursor-pointer items-center justify-between py-4 text-right transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="h-8 w-[2px] rounded-full transition-all duration-300 group-hover:h-10"
                      style={{
                        backgroundColor: perfume.spotlightColor,
                        boxShadow: `0 0 12px rgba(${perfume.spotlightRgb}, 0.65)`,
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs text-white/45">
                        <span className="tabular-nums">{perfume.number}</span>
                        <span aria-hidden="true">·</span>
                        <span>{perfume.family}</span>
                      </div>
                      <p
                        className={`mt-1 font-display text-2xl transition-colors ${
                          isCurrent
                            ? 'text-white'
                            : 'text-[#F5F3EF]/85 group-hover:text-white'
                        }`}
                      >
                        {perfume.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/45 group-hover:text-white/85">
                    <span className="hidden sm:inline">{perfume.lightLabel}</span>
                    <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-5 text-xs leading-relaxed text-white/45">
          {COLLECTION_INFO.collectionSubtitle} · {COLLECTION_INFO.editionLabel}
        </div>
      </div>
    </div>
  );
}
