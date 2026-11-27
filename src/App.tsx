import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Grid,
  Menu,
  Search,
  Sparkles,
  ShoppingBag,
  Lock,
  Unlock,
  Plus,
  Send,
  Edit3,
  Star,
  Check,
} from 'lucide-react';
import {
  CATEGORIES,
  COLLECTION_INFO,
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
import {
  loadStoredPerfumes,
  saveStoredPerfumes,
  resetStoredPerfumes,
  loadStoreConfig,
  saveStoreConfig,
  loadCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  isAdminLoggedIn,
  loginAdmin,
  logoutAdmin,
  generateWhatsAppOrderUrl,
  type CartItem,
  type StoreConfig,
} from './utils/storeManager';
import { StoneBackdrop } from './components/StoneBackdrop';
import { PerfumeAlcove } from './components/PerfumeAlcove';
import { PerfumeDetailView } from './components/PerfumeDetailView';
import { CollectionIndexDrawer } from './components/CollectionIndexDrawer';
import { PerfumeBottleVisual } from './components/PerfumeBottleVisual';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  // Inventory & Store State (Persistent)
  const [perfumes, setPerfumes] = useState<PerfumeItem[]>(() => loadStoredPerfumes());
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => loadStoreConfig());
  const [cart, setCart] = useState<CartItem[]>(() => loadCart());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminLoggedIn());

  // UI Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [perfumeToEdit, setPerfumeToEdit] = useState<PerfumeItem | null>(null);
  const [cartToastMessage, setCartToastMessage] = useState<string | null>(null);

  // Gallery Navigation State
  const [selectedPerfumeId, setSelectedPerfumeId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<FragranceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cinematic' | 'catalog'>('cinematic');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Filtered list based on active category and search
  const displayedPerfumes = useMemo(() => {
    return filterPerfumes(perfumes, activeCategory, searchQuery);
  }, [perfumes, activeCategory, searchQuery]);

  // Ensure focused index stays within valid range
  const safeFocusedIndex =
    displayedPerfumes.length === 0
      ? 0
      : Math.min(focusedIndex, displayedPerfumes.length - 1);

  const selectedPerfume = findPerfumeById(perfumes, selectedPerfumeId);
  const selectedIndex = findPerfumeIndexById(perfumes, selectedPerfumeId);

  const activeGalleryIndex = hoveredIndex ?? safeFocusedIndex;
  const activePerfume =
    selectedPerfume ??
    displayedPerfumes[activeGalleryIndex] ??
    perfumes[0];

  const formattedIndex = String(activeGalleryIndex + 1).padStart(2, '0');
  const formattedTotal = String(displayedPerfumes.length).padStart(2, '0');

  // Total items in cart
  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Open detail view for any perfume
  const handleOpenPerfume = useCallback((id: string) => {
    const idx = findPerfumeIndexById(perfumes, id);
    setFocusedIndex(idx);
    setSelectedPerfumeId(id);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [perfumes]);

  const handleBackToGallery = useCallback(() => {
    setSelectedPerfumeId(null);
  }, []);

  // Previous & Next navigation
  const handleNext = useCallback(() => {
    if (selectedPerfumeId) {
      const nextIdx = getNextPerfumeIndex(selectedIndex, perfumes.length);
      if (nextIdx >= 0) {
        setFocusedIndex(nextIdx);
        setSelectedPerfumeId(perfumes[nextIdx].id);
      }
      return;
    }
    if (displayedPerfumes.length > 0) {
      setFocusedIndex((prev) => getNextPerfumeIndex(prev, displayedPerfumes.length));
    }
  }, [selectedPerfumeId, selectedIndex, perfumes, displayedPerfumes.length]);

  const handlePrev = useCallback(() => {
    if (selectedPerfumeId) {
      const prevIdx = getPrevPerfumeIndex(selectedIndex, perfumes.length);
      if (prevIdx >= 0) {
        setFocusedIndex(prevIdx);
        setSelectedPerfumeId(perfumes[prevIdx].id);
      }
      return;
    }
    if (displayedPerfumes.length > 0) {
      setFocusedIndex((prev) => getPrevPerfumeIndex(prev, displayedPerfumes.length));
    }
  }, [selectedPerfumeId, selectedIndex, perfumes, displayedPerfumes.length]);

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
      });

      if (!action) return;

      switch (action.type) {
        case 'PREV':
          event.preventDefault();
          handlePrev();
          break;
        case 'NEXT':
          event.preventDefault();
          handleNext();
          break;
        case 'CLOSE_DRAWER':
          setIsDrawerOpen(false);
          setIsCartOpen(false);
          setIsAdminModalOpen(false);
          break;
        case 'BACK_TO_GALLERY':
          handleBackToGallery();
          break;
        case 'SELECT_CURRENT':
          if (!selectedPerfumeId && displayedPerfumes[safeFocusedIndex]) {
            handleOpenPerfume(displayedPerfumes[safeFocusedIndex].id);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    selectedPerfumeId,
    isDrawerOpen,
    handlePrev,
    handleNext,
    handleBackToGallery,
    handleOpenPerfume,
    displayedPerfumes,
    safeFocusedIndex,
  ]);

  // Cart Handlers
  const handleAddToCart = useCallback((perfume: PerfumeItem) => {
    const updated = addToCart(perfume, 1);
    setCart(updated);
    setCartToastMessage(`تمت إضافة "${perfume.name}" إلى السلة بنجاح`);
    setTimeout(() => setCartToastMessage(null), 3000);
  }, []);

  const handleUpdateCartQuantity = useCallback((id: string, delta: number) => {
    const updated = updateCartQuantity(id, delta);
    setCart(updated);
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    const updated = removeFromCart(id);
    setCart(updated);
  }, []);

  const handleClearCart = useCallback(() => {
    const updated = clearCart();
    setCart(updated);
  }, []);

  const handleDirectBuyWhatsApp = useCallback((perfume: PerfumeItem) => {
    const url = generateWhatsAppOrderUrl([{ perfume, quantity: 1 }], storeConfig);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [storeConfig]);

  // Admin Handlers
  const handleAdminLogin = useCallback((pin: string) => {
    const success = loginAdmin(pin, storeConfig.adminPin);
    if (success) {
      setIsAdmin(true);
    }
    return success;
  }, [storeConfig.adminPin]);

  const handleAdminLogout = useCallback(() => {
    logoutAdmin();
    setIsAdmin(false);
    setIsAdminModalOpen(false);
  }, []);

  const handleSavePerfume = useCallback((perfume: PerfumeItem) => {
    setPerfumes((prev) => {
      const idx = prev.findIndex((p) => p.id === perfume.id);
      let updated: PerfumeItem[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = perfume;
      } else {
        updated = [perfume, ...prev];
      }
      saveStoredPerfumes(updated);
      return updated;
    });
  }, []);

  const handleDeletePerfume = useCallback((id: string) => {
    setPerfumes((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveStoredPerfumes(updated);
      return updated;
    });
    if (selectedPerfumeId === id) {
      setSelectedPerfumeId(null);
    }
  }, [selectedPerfumeId]);

  const handleResetCatalog = useCallback(() => {
    const reset = resetStoredPerfumes();
    setPerfumes(reset);
    setSelectedPerfumeId(null);
    setIsAdminModalOpen(false);
  }, []);

  const handleSaveStoreConfig = useCallback((config: StoreConfig) => {
    saveStoreConfig(config);
    setStoreConfig(config);
  }, []);

  const handleOpenEditPerfume = useCallback((perfume: PerfumeItem) => {
    setPerfumeToEdit(perfume);
    setIsAdminModalOpen(true);
  }, []);

  // Pagination for Cinematic view (5 per screen on desktop)
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

      {/* Cart Toast Notification */}
      {cartToastMessage && (
        <div className="fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-500/40 bg-[#0c120e]/95 px-5 py-2.5 text-xs font-medium text-emerald-300 shadow-2xl backdrop-blur-md">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{cartToastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="mr-2 underline text-[#D4AF37] hover:text-white"
          >
            عرض السلة
          </button>
        </div>
      )}

      {selectedPerfume ? (
        <PerfumeDetailView
          key="detail-view"
          perfume={selectedPerfume}
          currentIndex={selectedIndex}
          total={perfumes.length}
          onBack={handleBackToGallery}
          onPrev={handlePrev}
          onNext={handleNext}
          onOpenIndex={() => setIsDrawerOpen(true)}
          onAddToCart={handleAddToCart}
          onDirectBuyWhatsApp={handleDirectBuyWhatsApp}
          isAdmin={isAdmin}
          onEditPerfume={handleOpenEditPerfume}
          currency={storeConfig.currency}
        />
      ) : (
        <div
          key="gallery-view"
          className="animate-gallery-in relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col justify-between px-4 py-4 sm:px-7 sm:py-6 lg:px-10 lg:py-6"
        >
          {/* Top Bar: Brand, Search, Mode Toggle, Drawer trigger, Cart & Admin */}
          <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl tracking-wide text-[#F5F3EF] sm:text-2xl">
                  {storeConfig.storeName || COLLECTION_INFO.brandName}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-px w-6 bg-white/20 sm:inline-block"
                />
                <span className="hidden text-xs font-mono text-[#D4AF37] sm:inline-block">
                  {COLLECTION_INFO.brandEn}
                </span>
              </div>

              {/* View Switcher, Cart, Admin, & Drawer trigger */}
              <div className="flex items-center gap-2">
                {/* View switcher */}
                <div className="hidden sm:flex items-center rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
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
                    <span>العرض السينمائي</span>
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
                    <span>الكتالوج الشامل</span>
                  </button>
                </div>

                {/* Index Drawer Button */}
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="فتح فهرس العطور"
                  className="inline-flex min-h-[38px] cursor-pointer items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-[#D4AF37]/60 hover:text-white"
                >
                  <Menu className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden md:inline">الفهرس ({perfumes.length})</span>
                </button>

                {/* Cart Button with Count Badge */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  aria-label="فتح حقيبة التسوق"
                  className="relative inline-flex min-h-[38px] cursor-pointer items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
                  <span className="hidden xs:inline">السلة</span>
                  {totalCartCount > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[11px] font-bold text-black shadow-md">
                      {totalCartCount}
                    </span>
                  )}
                </button>

                {/* Admin Mode Button */}
                <button
                  type="button"
                  onClick={() => {
                    setPerfumeToEdit(null);
                    setIsAdminModalOpen(true);
                  }}
                  className={`inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    isAdmin
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      : 'border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                  title={isAdmin ? 'لوحة تحكم المنفذ الإداري (مفتوحة)' : 'تسجيل دخول مالك المتجر'}
                >
                  {isAdmin ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                  <span className="hidden md:inline">{isAdmin ? 'لوحة الإدارة' : 'المالك'}</span>
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
            /* Luxury Sales Outlet Catalog Grid Mode */
            <main
              aria-label="كتالوج منفذ بيع العطور الشامل"
              className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {displayedPerfumes.map((perfume) => (
                <div
                  key={perfume.id}
                  onClick={() => handleOpenPerfume(perfume.id)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0E] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-2xl"
                  style={{
                    boxShadow: `0 0 30px -15px rgba(${perfume.spotlightRgb}, 0.25)`,
                  }}
                >
                  {/* Top Badges & Stock */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#D4AF37]">
                      {perfume.brand}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {perfume.badge && (
                        <span className="rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-medium text-[#D4AF37] border border-[#D4AF37]/30">
                          {perfume.badge}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                          perfume.inStock
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : 'text-red-400 bg-red-500/10'
                        }`}
                      >
                        {perfume.inStock ? 'متوفر' : 'نفد'}
                      </span>
                    </div>
                  </div>

                  {/* Bottle Visual Stage */}
                  <div className="relative my-4 flex h-52 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-20 blur-xl transition-opacity group-hover:opacity-40"
                      style={{
                        backgroundColor: `rgba(${perfume.spotlightRgb}, 0.6)`,
                      }}
                    />
                    <div className="relative aspect-[3/4] h-44">
                      <PerfumeBottleVisual
                        perfume={perfume}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Perfume Identity */}
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-display text-base font-medium text-white transition-colors group-hover:text-[#D4AF37]">
                      {perfume.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span>{perfume.rating || 4.9}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-light text-white/50">
                    {perfume.nameEn} · {perfume.concentration}
                  </span>

                  {/* Pricing Bar */}
                  <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-2.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-[#D4AF37]">
                        {perfume.price} {storeConfig.currency}
                      </span>
                      {perfume.originalPrice && (
                        <span className="text-xs text-white/40 line-through">
                          {perfume.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-white/40">
                      {perfume.volume}
                    </span>
                  </div>

                  {/* Action Buttons: Add to Cart & Admin Edit */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(perfume);
                      }}
                      disabled={!perfume.inStock}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#D4AF37] py-2 text-xs font-semibold text-black transition-transform active:scale-95 hover:bg-[#e0be49] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>{perfume.inStock ? 'أضف للسلة' : 'غير متوفر'}</span>
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditPerfume(perfume);
                        }}
                        className="flex cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/[0.05] p-2 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        title="تعديل السعر أو بيانات العطر"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </main>
          )}

          {/* Bottom Footer & Navigation Controls */}
          <footer className="flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.08] pt-4">
            <div className="flex items-baseline gap-4">
              <h1 className="font-display text-2xl leading-none font-normal italic text-[#F5F3EF] sm:text-3xl lg:text-[34px]">
                {storeConfig.storeName || COLLECTION_INFO.collectionTitle}
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
        perfumes={perfumes}
        selectedId={selectedPerfumeId}
        onClose={() => setIsDrawerOpen(false)}
        onSelectPerfume={handleOpenPerfume}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        config={storeConfig}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Protected Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setPerfumeToEdit(null);
        }}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        perfumes={perfumes}
        config={storeConfig}
        onSavePerfume={handleSavePerfume}
        onDeletePerfume={handleDeletePerfume}
        onResetCatalog={handleResetCatalog}
        onSaveConfig={handleSaveStoreConfig}
        initialEditingPerfume={perfumeToEdit}
      />
    </div>
  );
}
