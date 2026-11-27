import { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Send,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { CartItem, StoreConfig, CustomerInfo } from '../utils/storeManager';
import { generateWhatsAppOrderUrl } from '../utils/storeManager';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  config: StoreConfig;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  config,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'الدفع عند الاستلام (COD)',
  });
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.perfume.price * item.quantity,
    0,
  );
  const isFreeShipping = subtotal >= config.freeShippingThreshold;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : config.shippingCost;
  const total = subtotal + shippingCost;
  const remainingForFreeShipping = Math.max(
    0,
    config.freeShippingThreshold - subtotal,
  );
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / config.freeShippingThreshold) * 100),
  );

  const handleCheckoutViaWhatsApp = () => {
    const url = generateWhatsAppOrderUrl(items, config, showCheckoutForm ? customer : undefined);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-md flex-col border-r border-white/10 bg-[#07070A] text-[#F5F3EF] shadow-2xl transition-all"
        aria-label="سلة المشتريات"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#D4AF37]" />
            <h2 className="font-display text-lg font-medium text-white">
              حقيبة التسوق ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="إغلاق السلة"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="border-b border-white/5 bg-white/[0.02] px-5 py-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-white/70">
              <Truck className="h-3.5 w-3.5 text-[#D4AF37]" />
              {isFreeShipping ? (
                <span className="font-medium text-emerald-400">
                  مبروك! مؤهل للشحن المجاني الفاخر
                </span>
              ) : (
                <span>
                  أضف{' '}
                  <strong className="text-[#D4AF37]">
                    {remainingForFreeShipping} {config.currency}
                  </strong>{' '}
                  للحصول على شحن مجاني
                </span>
              )}
            </span>
            <span className="text-[11px] text-white/40">{freeShippingProgress}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.02]">
                <ShoppingBag className="h-8 w-8 text-white/30" />
              </div>
              <h3 className="mt-4 font-display text-base text-white/80">
                حقيبتك فارغة حالياً
              </h3>
              <p className="mt-1 text-xs text-white/40">
                استكشف مجموعتنا الفاخرة من أرقى العطور العالمية وأضف عطرك المفضل.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-md border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-5 py-2 text-xs font-medium text-[#D4AF37] hover:bg-[#D4AF37]/20"
              >
                تصفح الكتالوج الآن
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map(({ perfume, quantity }) => (
                <div
                  key={perfume.id}
                  className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/20"
                >
                  {/* Thumbnail */}
                  <div className="relative flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/5 bg-[#030304] p-1">
                    <PerfumeBottleVisual
                      perfume={perfume}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[10px] font-semibold text-[#D4AF37]">
                            {perfume.brand}
                          </span>
                          <h4 className="font-display text-sm font-medium text-white">
                            {perfume.name}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(perfume.id)}
                          className="text-white/40 hover:text-red-400"
                          title="حذف"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-white/40">
                        {perfume.concentration} · {perfume.volume}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-[#F5F3EF]">
                          {perfume.price * quantity} {config.currency}
                        </span>
                        {quantity > 1 && (
                          <span className="text-[10px] text-white/40">
                            ({perfume.price} {config.currency}/قطعة)
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center rounded border border-white/15 bg-white/[0.04]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(perfume.id, -1)}
                          className="flex h-6 w-6 items-center justify-center text-white/60 hover:bg-white/10 hover:text-white"
                          aria-label="تقليل الكمية"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums text-white">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(perfume.id, 1)}
                          className="flex h-6 w-6 items-center justify-center text-white/60 hover:bg-white/10 hover:text-white"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Details Toggle Form */}
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-3.5">
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                  className="flex w-full items-center justify-between text-xs font-medium text-white/90"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                    بيانات الشحن والتوصيل (اختياري للإرسال مع الطلب)
                  </span>
                  <span className="text-[11px] text-[#D4AF37]">
                    {showCheckoutForm ? 'إخفاء' : 'تعبئة'}
                  </span>
                </button>

                {showCheckoutForm && (
                  <div className="mt-3 space-y-2.5 pt-2 text-xs">
                    <div>
                      <label className="mb-1 block text-[11px] text-white/60">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        value={customer.fullName}
                        onChange={(e) =>
                          setCustomer({ ...customer, fullName: e.target.value })
                        }
                        placeholder="مثال: أحمد عبد الله"
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="mb-1 block text-[11px] text-white/60">
                          رقم الهاتف
                        </label>
                        <input
                          type="tel"
                          value={customer.phone}
                          onChange={(e) =>
                            setCustomer({ ...customer, phone: e.target.value })
                          }
                          placeholder="05XXXXXXXX"
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] text-white/60">
                          المدينة
                        </label>
                        <input
                          type="text"
                          value={customer.city}
                          onChange={(e) =>
                            setCustomer({ ...customer, city: e.target.value })
                          }
                          placeholder="الرياض / القاهرة..."
                          className="w-full rounded border border-white/15 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] text-white/60">
                        العنوان التفصيلي
                      </label>
                      <input
                        type="text"
                        value={customer.address}
                        onChange={(e) =>
                          setCustomer({ ...customer, address: e.target.value })
                        }
                        placeholder="الحي، الشارع، رقم المبنى"
                        className="w-full rounded border border-white/15 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-[#050508] p-5">
            <div className="space-y-1.5 text-xs text-white/70">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span className="font-semibold text-white">
                  {subtotal} {config.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>الشحن والتوصيل</span>
                <span className={isFreeShipping ? 'font-medium text-emerald-400' : 'text-white'}>
                  {isFreeShipping ? 'مجاني' : `${shippingCost} ${config.currency}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-semibold text-white">
                <span>الإجمالي النهائي</span>
                <span className="text-base text-[#D4AF37]">
                  {total} {config.currency}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCheckoutViaWhatsApp}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 text-xs font-semibold text-white shadow-lg shadow-emerald-950/40 transition-transform active:scale-[0.98] hover:from-emerald-500 hover:to-emerald-400"
              >
                <Send className="h-4 w-4" />
                <span>إتمام الطلب المباشر عبر واتساب</span>
              </button>

              <div className="flex items-center justify-between pt-1 text-[11px] text-white/40">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="hover:text-red-400 hover:underline"
                >
                  تفريغ السلة بالكامل
                </button>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>عطور أصلية 100% مضمونة</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
