import { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Sliders,
  DollarSign,
  Package,
  Settings,
  AlertTriangle,
  Check,
  Search,
} from 'lucide-react';
import type { PerfumeItem, FragranceCategory } from '../data/perfumes';
import { CATEGORIES } from '../data/perfumes';
import type { StoreConfig } from '../utils/storeManager';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  perfumes: PerfumeItem[];
  config: StoreConfig;
  onSavePerfume: (perfume: PerfumeItem) => void;
  onDeletePerfume: (id: string) => void;
  onResetCatalog: () => void;
  onSaveConfig: (config: StoreConfig) => void;
  initialEditingPerfume?: PerfumeItem | null;
}

export function AdminPanelModal({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  perfumes,
  config,
  onSavePerfume,
  onDeletePerfume,
  onResetCatalog,
  onSaveConfig,
  initialEditingPerfume = null,
}: AdminPanelModalProps) {
  // Login State
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [searchFilter, setSearchFilter] = useState('');

  // Editing perfume state (sub-form)
  const [editingPerfume, setEditingPerfume] = useState<PerfumeItem | null>(
    initialEditingPerfume,
  );
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Editable settings state
  const [tempConfig, setTempConfig] = useState<StoreConfig>(config);
  const [newPin, setNewPin] = useState('');
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pinInput);
    if (!success) {
      setPinError(true);
    } else {
      setPinError(false);
      setPinInput('');
    }
  };

  const handleStartNewPerfume = () => {
    const newId = `perfume-${Date.now()}`;
    const emptyPerfume: PerfumeItem = {
      id: newId,
      name: '',
      nameEn: '',
      brand: '',
      brandEn: '',
      category: 'oriental',
      categoryLabel: 'شرقي فاخر',
      concentration: 'Eau de Parfum',
      volume: '100ml',
      gender: 'للجنسين',
      price: 450,
      originalPrice: 550,
      inStock: true,
      rating: 5.0,
      reviewsCount: 1,
      badge: 'جديد',
      bottleVisual: {
        accentColor: '#D4AF37',
        silhouette: 'classic-column',
        material: 'glass-amber',
        cap: 'gold-cube',
        liquidColor: 'rgba(212, 175, 55, 0.45)',
      },
      spotlightColor: '#D4AF37',
      spotlightRgb: '212, 175, 55',
      description: '',
      notes: {
        top: '',
        heart: '',
        base: '',
      },
      season: 'شتاء / خريف',
      timeOfDay: 'مسائي',
      family: 'شرقي خشبي',
    };
    setEditingPerfume(emptyPerfume);
    setIsCreatingNew(true);
  };

  const handleSavePerfumeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPerfume) return;
    onSavePerfume(editingPerfume);
    setEditingPerfume(null);
    setIsCreatingNew(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...tempConfig,
      adminPin: newPin.trim() ? newPin.trim() : tempConfig.adminPin,
    };
    onSaveConfig(updated);
    setSettingsSavedMessage(true);
    setTimeout(() => setSettingsSavedMessage(false), 2500);
  };

  const filteredPerfumes = perfumes.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.brandEn.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Dialog Modal */}
      <div
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0A0A0E] text-[#F5F3EF] shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
              {isAdmin ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-white">
                منظومة إدارة منفذ العطور (المالك فقط)
              </h2>
              <p className="text-[11px] text-white/50">
                تحكم بالأسعار، المخزون، إضافة وتعديل العطور وإعدادات المتجر
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* NOT AUTHENTICATED: Login Form */}
        {!isAdmin ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
              <KeyRound className="h-7 w-7 text-[#D4AF37]" />
            </div>
            <h3 className="mt-4 font-display text-lg text-white">
              أدخل رمز المرور السري للمدير
            </h3>
            <p className="mt-1 text-xs text-white/50">
              هذه المنطقة مخصصة حصرياً لمالك المتجر لتعديل الأسعار وإدارة الكتالوج
            </p>

            <form onSubmit={handleLoginSubmit} className="mt-6 w-full max-w-xs">
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="رمز المرور (الافتراضي: admin123)"
                  autoFocus
                  className={`w-full rounded-lg border bg-white/[0.04] px-4 py-2.5 text-center text-sm tracking-widest text-white placeholder-white/30 outline-none transition-colors ${
                    pinError
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-white/20 focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              {pinError && (
                <p className="mt-2 text-xs text-red-400">
                  رمز المرور غير صحيح. جرب: admin123
                </p>
              )}

              <button
                type="submit"
                className="mt-4 w-full cursor-pointer rounded-lg bg-[#D4AF37] py-2.5 text-xs font-semibold text-black transition-transform active:scale-95 hover:bg-[#e0be49]"
              >
                تسجيل الدخول للمنظومة
              </button>

              <div className="mt-3 text-[11px] text-white/40">
                الرمز الافتراضي المبرمج هو:{' '}
                <span className="font-mono text-[#D4AF37]">admin123</span>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED: Admin Dashboard */
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Navigation Tabs & Logout */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-2.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('products');
                    setEditingPerfume(null);
                  }}
                  className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === 'products'
                      ? 'border border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Package className="h-3.5 w-3.5" />
                  <span>العطور والأسعار ({perfumes.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('settings');
                    setEditingPerfume(null);
                  }}
                  className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === 'settings'
                      ? 'border border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>إعدادات المتجر والواتساب</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="rounded border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs text-red-300 hover:bg-red-500/20"
              >
                قفل المنظومة وخروج
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {/* SUB-VIEW: EDIT / ADD PERFUME FORM */}
              {editingPerfume ? (
                <form onSubmit={handleSavePerfumeForm} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-display text-base text-white">
                      {isCreatingNew
                        ? 'إضافة عطر عالمي جديد إلى الكتالوج'
                        : `تعديل عطر: ${editingPerfume.name} (${editingPerfume.nameEn})`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingPerfume(null)}
                      className="text-xs text-white/50 hover:text-white"
                    >
                      إلغاء والعودة للقائمة
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        اسم العطر بالعربية *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPerfume.name}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        الاسم بالإنجليزية (Name in English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPerfume.nameEn}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            nameEn: e.target.value,
                          })
                        }
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        الدار / الماركة بالعربية *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPerfume.brand}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            brand: e.target.value,
                          })
                        }
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        الدار بالإنجليزية (Brand) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPerfume.brandEn}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            brandEn: e.target.value,
                          })
                        }
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Pricing */}
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        سعر البيع الحالي ({config.currency}) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={editingPerfume.price}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full rounded border border-[#D4AF37]/50 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-[#D4AF37] outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        السعر قبل الخصم (اختياري للإغراء)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editingPerfume.originalPrice || ''}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            originalPrice: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          })
                        }
                        placeholder="اتركه فارغاً إن لم يكن هناك خصم"
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Category & Stock */}
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        فئة العطر
                      </label>
                      <select
                        value={editingPerfume.category}
                        onChange={(e) => {
                          const cat = e.target.value as FragranceCategory;
                          const matched = CATEGORIES.find((c) => c.id === cat);
                          setEditingPerfume({
                            ...editingPerfume,
                            category: cat,
                            categoryLabel: matched?.label || 'عطور فاخرة',
                          });
                        }}
                        className="w-full rounded border border-white/15 bg-[#0C0C12] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      >
                        {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        حالة التوفر بالمخزون
                      </label>
                      <div className="flex items-center gap-4 pt-1">
                        <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                          <input
                            type="radio"
                            name="stock"
                            checked={editingPerfume.inStock}
                            onChange={() =>
                              setEditingPerfume({
                                ...editingPerfume,
                                inStock: true,
                              })
                            }
                          />
                          <span className="text-emerald-400">متوفر للطلب</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                          <input
                            type="radio"
                            name="stock"
                            checked={!editingPerfume.inStock}
                            onChange={() =>
                              setEditingPerfume({
                                ...editingPerfume,
                                inStock: false,
                              })
                            }
                          />
                          <span className="text-red-400">نفد من المخزون</span>
                        </label>
                      </div>
                    </div>

                    {/* Image URL & Badge */}
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        مسار صورة الزجاجة (Bottle Image)
                      </label>
                      <input
                        type="text"
                        value={editingPerfume.bottleImage || ''}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            bottleImage: e.target.value,
                          })
                        }
                        placeholder="/assets/bottles/sauvage-elixir.png"
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        شارة مميزة (Badge)
                      </label>
                      <input
                        type="text"
                        value={editingPerfume.badge || ''}
                        onChange={(e) =>
                          setEditingPerfume({
                            ...editingPerfume,
                            badge: e.target.value,
                          })
                        }
                        placeholder="الأكثر مبيعاً، حصري، خصم خاص..."
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Size and Concentration */}
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        التركيز والحجم
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editingPerfume.concentration}
                          onChange={(e) =>
                            setEditingPerfume({
                              ...editingPerfume,
                              concentration: e.target.value,
                            })
                          }
                          placeholder="Eau de Parfum"
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                        />
                        <input
                          type="text"
                          value={editingPerfume.volume}
                          onChange={(e) =>
                            setEditingPerfume({
                              ...editingPerfume,
                              volume: e.target.value,
                            })
                          }
                          placeholder="100ml"
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        الفصل والوقت
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editingPerfume.season}
                          onChange={(e) =>
                            setEditingPerfume({
                              ...editingPerfume,
                              season: e.target.value,
                            })
                          }
                          placeholder="جميع الفصول"
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                        />
                        <input
                          type="text"
                          value={editingPerfume.timeOfDay}
                          onChange={(e) =>
                            setEditingPerfume({
                              ...editingPerfume,
                              timeOfDay: e.target.value,
                            })
                          }
                          placeholder="مسائي / نهاري"
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes Pyramid */}
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs">
                    <span className="font-medium text-[#D4AF37]">
                      الهرم العطري والنوتات
                    </span>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-[11px] text-white/50">
                          القمة (Top)
                        </label>
                        <input
                          type="text"
                          value={editingPerfume.notes.top}
                          onChange={(e) =>
                            setEditingPerfume({
                              ...editingPerfume,
                              notes: {
                                ...editingPerfume.notes,
                                top: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-white/50">
                          القلب (Heart)
                        </label>
                        <input
                          type="text"
                          value={editingPerfume.notes.heart}
                          onChange={(e) =>
                            setEditingPerfume({
                              ...editingPerfume,
                              notes: {
                                ...editingPerfume.notes,
                                heart: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-white/50">
                          القاعدة (Base)
                        </label>
                        <input
                          type="text"
                          value={editingPerfume.notes.base}
                          onChange={(e) =>
                            setEditingPerfume({
                              ...editingPerfume,
                              notes: {
                                ...editingPerfume.notes,
                                base: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-1 block text-xs text-white/70">
                      وصف العطر وسحر الرائحة
                    </label>
                    <textarea
                      rows={3}
                      value={editingPerfume.description}
                      onChange={(e) =>
                        setEditingPerfume({
                          ...editingPerfume,
                          description: e.target.value,
                        })
                      }
                      className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingPerfume(null)}
                      className="rounded border border-white/15 px-4 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="flex cursor-pointer items-center gap-1.5 rounded bg-[#D4AF37] px-5 py-2 text-xs font-semibold text-black hover:bg-[#e0be49]"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>حفظ العطر ونشره بالمتجر فوراً</span>
                    </button>
                  </div>
                </form>
              ) : activeTab === 'products' ? (
                /* PRODUCTS LIST TAB */
                <div className="space-y-4">
                  {/* Toolbar */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-72">
                      <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                      <input
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder="ابحث لتعديل السعر أو المخزون..."
                        className="w-full rounded-md border border-white/15 bg-white/[0.03] py-1.5 pr-8 pl-3 text-xs text-white placeholder-white/40 outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleStartNewPerfume}
                      className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-black hover:bg-[#e0be49]"
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة عطر جديد للكتالوج</span>
                    </button>
                  </div>

                  {/* Products Table */}
                  <div className="overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full text-right text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.03] text-white/50">
                        <tr>
                          <th className="py-2.5 px-3">الزجاجة</th>
                          <th className="py-2.5 px-3">العطر / الدار</th>
                          <th className="py-2.5 px-3">السعر الحالي ({config.currency})</th>
                          <th className="py-2.5 px-3">قبل الخصم</th>
                          <th className="py-2.5 px-3">المخزون</th>
                          <th className="py-2.5 px-3 text-center">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredPerfumes.map((p) => (
                          <tr
                            key={p.id}
                            className="transition-colors hover:bg-white/[0.02]"
                          >
                            <td className="py-2 px-3">
                              <div className="flex h-12 w-10 items-center justify-center rounded border border-white/10 bg-[#040406] p-1">
                                <PerfumeBottleVisual
                                  perfume={p}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="font-medium text-white">{p.name}</div>
                              <div className="text-[10px] text-white/40">
                                {p.brand} · {p.nameEn}
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                min="0"
                                value={p.price}
                                onChange={(e) => {
                                  const updated = {
                                    ...p,
                                    price: Number(e.target.value),
                                  };
                                  onSavePerfume(updated);
                                }}
                                className="w-20 rounded border border-white/15 bg-white/[0.04] px-2 py-1 font-semibold text-[#D4AF37] outline-none focus:border-[#D4AF37]"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                min="0"
                                value={p.originalPrice || ''}
                                placeholder="-"
                                onChange={(e) => {
                                  const val = e.target.value
                                    ? Number(e.target.value)
                                    : undefined;
                                  const updated = { ...p, originalPrice: val };
                                  onSavePerfume(updated);
                                }}
                                className="w-16 rounded border border-white/15 bg-white/[0.04] px-2 py-1 text-white/60 outline-none focus:border-[#D4AF37]"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = { ...p, inStock: !p.inStock };
                                  onSavePerfume(updated);
                                }}
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                                  p.inStock
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {p.inStock ? 'متوفر' : 'نفد'}
                              </button>
                            </td>
                            <td className="py-2 px-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingPerfume(p);
                                    setIsCreatingNew(false);
                                  }}
                                  className="rounded p-1.5 text-white/60 hover:bg-white/10 hover:text-[#D4AF37]"
                                  title="تعديل تفاصيل العطر"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `هل أنت متأكد من حذف عطر "${p.name}"؟`,
                                      )
                                    ) {
                                      onDeletePerfume(p.id);
                                    }
                                  }}
                                  className="rounded p-1.5 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                                  title="حذف العطر"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* STORE SETTINGS TAB */
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  {settingsSavedMessage && (
                    <div className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                      <Check className="h-4 w-4" />
                      <span>تم حفظ وتحديث إعدادات المتجر بنجاح!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        اسم المتجر / المنفذ
                      </label>
                      <input
                        type="text"
                        value={tempConfig.storeName}
                        onChange={(e) =>
                          setTempConfig({
                            ...tempConfig,
                            storeName: e.target.value,
                          })
                        }
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        رمز العملة المعروضة (Currency)
                      </label>
                      <input
                        type="text"
                        value={tempConfig.currency}
                        onChange={(e) =>
                          setTempConfig({
                            ...tempConfig,
                            currency: e.target.value,
                          })
                        }
                        placeholder="ر.س / ج.م / $ / د.إ"
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        رقم هاتف الواتساب لاستقبال طلبات الزبائن *
                      </label>
                      <input
                        type="tel"
                        required
                        value={tempConfig.whatsappNumber}
                        onChange={(e) =>
                          setTempConfig({
                            ...tempConfig,
                            whatsappNumber: e.target.value,
                          })
                        }
                        placeholder="مثال: 966500000000 أو 201000000000 (بالكود الدولي)"
                        className="w-full rounded border border-emerald-500/40 bg-white/[0.03] px-3 py-1.5 text-xs text-emerald-300 outline-none focus:border-emerald-400"
                      />
                      <span className="mt-1 block text-[10px] text-white/40">
                        اكتب الرقم بدون علامة + وبدايته كود الدولة (مثال 966 أو 20)
                      </span>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        تكلفة الشحن القياسية ({tempConfig.currency})
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={tempConfig.shippingCost}
                        onChange={(e) =>
                          setTempConfig({
                            ...tempConfig,
                            shippingCost: Number(e.target.value),
                          })
                        }
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        الحد الأدنى للشحن المجاني ({tempConfig.currency})
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={tempConfig.freeShippingThreshold}
                        onChange={(e) =>
                          setTempConfig({
                            ...tempConfig,
                            freeShippingThreshold: Number(e.target.value),
                          })
                        }
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-white/70">
                        تغيير رمز مرور الإدارة (PIN Code)
                      </label>
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="اتركه فارغاً للاحتفاظ بالرمز الحالي"
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#D4AF37] px-6 py-2.5 text-xs font-semibold text-black hover:bg-[#e0be49]"
                    >
                      <Save className="h-4 w-4" />
                      <span>حفظ الإعدادات</span>
                    </button>
                  </div>

                  {/* Danger Zone: Reset to Defaults */}
                  <div className="mt-8 rounded-lg border border-red-500/30 bg-red-500/[0.04] p-4">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      <h4 className="text-xs font-semibold">
                        منطقة الاستعادة وإعادة الضبط (Danger Zone)
                      </h4>
                    </div>
                    <p className="mt-1 text-[11px] text-white/50">
                      يمكنك إعادة تعيين جميع العطور والأسعار إلى الكتالوج الأصلي المكون من 26 عطر عالمي بصور الزجاجات الحقيقية.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            'تحذير: هل أنت متأكد من استعادة الكتالوج الافتراضي بالكامل؟ ستتم استعادة الأسعار والصور الأصلية.',
                          )
                        ) {
                          onResetCatalog();
                        }
                      }}
                      className="mt-3 flex items-center gap-1.5 rounded border border-red-500/50 bg-red-500/10 px-3.5 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>استعادة الكتالوج الافتراضي الأصلي (26 عطر)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
