import { PERFUMES, STORE_CONFIG, type PerfumeItem, type StoreConfig } from '../data/perfumes';

export type { StoreConfig };

export interface CartItem {
  perfume: PerfumeItem;
  quantity: number;
  selectedVolume?: string;
}

export interface CustomerInfo {
  fullName?: string;
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  notes?: string;
  paymentMethod?: string;
}

const STORAGE_KEYS = {
  PERFUMES: 'perfumes_inventory_v1',
  CONFIG: 'perfumes_store_config_v1',
  ADMIN_AUTH: 'perfumes_admin_auth_v1',
  CART: 'perfumes_cart_v1',
};

/**
 * Loads perfumes from localStorage or initializes with default PERFUMES catalog
 */
export function loadStoredPerfumes(): PerfumeItem[] {
  if (typeof window === 'undefined') return PERFUMES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PERFUMES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PERFUMES, JSON.stringify(PERFUMES));
      return PERFUMES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PERFUMES;
  } catch {
    return PERFUMES;
  }
}

/**
 * Saves perfume inventory to localStorage
 */
export function saveStoredPerfumes(perfumes: PerfumeItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PERFUMES, JSON.stringify(perfumes));
  } catch (e) {
    console.error('Error saving perfumes to localStorage', e);
  }
}

/**
 * Resets inventory back to original 26 perfumes
 */
export function resetStoredPerfumes(): PerfumeItem[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.PERFUMES, JSON.stringify(PERFUMES));
    } catch (e) {
      console.error('Error resetting perfumes catalog', e);
    }
  }
  return PERFUMES;
}

/**
 * Loads store configuration or initializes defaults
 */
export function loadStoreConfig(): StoreConfig {
  if (typeof window === 'undefined') return STORE_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(STORE_CONFIG));
      return STORE_CONFIG;
    }
    return { ...STORE_CONFIG, ...JSON.parse(raw) };
  } catch {
    return STORE_CONFIG;
  }
}

/**
 * Saves store configuration to localStorage
 */
export function saveStoreConfig(config: StoreConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving config to localStorage', e);
  }
}

/**
 * Checks if admin session is active
 */
export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

/**
 * Logs in admin using PIN verification
 */
export function loginAdmin(pin: string, expectedPin?: string): boolean {
  const config = loadStoreConfig();
  const targetPin = expectedPin || config.adminPin;
  if (pin.trim() === targetPin.trim()) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    }
    return true;
  }
  return false;
}

/**
 * Logs out admin
 */
export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}

/**
 * Loads Cart items from localStorage
 */
export function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Saves Cart items to localStorage
 */
export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart', e);
  }
}

/**
 * Adds an item to the shopping cart
 */
export function addToCart(perfume: PerfumeItem, quantity: number = 1): CartItem[] {
  const current = loadCart();
  const existingIdx = current.findIndex((item) => item.perfume.id === perfume.id);
  let updated: CartItem[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = {
      ...updated[existingIdx],
      quantity: updated[existingIdx].quantity + quantity,
    };
  } else {
    updated = [
      ...current,
      {
        perfume,
        quantity,
        selectedVolume: perfume.volume,
      },
    ];
  }

  saveCart(updated);
  return updated;
}

/**
 * Updates item quantity in cart (+1 or -1)
 */
export function updateCartQuantity(perfumeId: string, delta: number): CartItem[] {
  const current = loadCart();
  const updated: CartItem[] = [];

  for (const item of current) {
    if (item.perfume.id === perfumeId) {
      const newQty = item.quantity + delta;
      if (newQty > 0) {
        updated.push({ ...item, quantity: newQty });
      }
    } else {
      updated.push(item);
    }
  }

  saveCart(updated);
  return updated;
}

/**
 * Removes an item from the cart
 */
export function removeFromCart(perfumeId: string): CartItem[] {
  const current = loadCart();
  const updated = current.filter((item) => item.perfume.id !== perfumeId);
  saveCart(updated);
  return updated;
}

/**
 * Clears the shopping cart completely
 */
export function clearCart(): CartItem[] {
  saveCart([]);
  return [];
}

/**
 * Generates an official WhatsApp order URL with formatted invoice
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  config: StoreConfig,
  customer?: CustomerInfo,
): string {
  const subtotal = items.reduce(
    (sum, item) => sum + item.perfume.price * item.quantity,
    0,
  );
  const isFreeShipping = subtotal >= config.freeShippingThreshold;
  const shipping = items.length === 0 ? 0 : isFreeShipping ? 0 : config.shippingCost;
  const grandTotal = subtotal + shipping;

  let msg = `✨ *طلب شراء جديد من ${config.storeName || config.brandName}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;

  items.forEach((item, index) => {
    msg += `*${index + 1}. ${item.perfume.name}* (${item.perfume.brand})\n`;
    msg += `   الحجم: ${item.selectedVolume || item.perfume.volume} | الكمية: ${item.quantity}\n`;
    msg += `   السعر: ${item.perfume.price * item.quantity} ${config.currency}\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💵 *المجموع الفرعي:* ${subtotal} ${config.currency}\n`;
  msg += `🚚 *الشحن:* ${isFreeShipping ? 'مجاني 🎉' : `${shipping} ${config.currency}`}\n`;
  msg += `💰 *الإجمالي النهائي:* ${grandTotal} ${config.currency}\n`;

  const customerName = customer?.fullName || customer?.name;
  if (customerName) {
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *بيانات العميل المستلم:*\n`;
    msg += `الاسم: ${customerName}\n`;
    if (customer?.phone) msg += `رقم الجوال: ${customer.phone}\n`;
    if (customer?.city) msg += `المدينة: ${customer.city}\n`;
    if (customer?.address) msg += `العنوان: ${customer.address}\n`;
    if (customer?.paymentMethod) msg += `طريقة الدفع: ${customer.paymentMethod}\n`;
    if (customer?.notes) msg += `ملاحظات: ${customer.notes}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📍 أرجو تأكيد توفر العطور وإرسال رقم الحساب أو تأكيد الشحن، شكراً لكم!`;

  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}
