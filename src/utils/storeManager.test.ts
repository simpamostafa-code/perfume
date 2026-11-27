import test from 'node:test';
import assert from 'node:assert/strict';
import {
  loadStoredPerfumes,
  loadStoreConfig,
  generateWhatsAppOrderUrl,
  loginAdmin,
} from './storeManager';
import { PERFUMES } from '../data/perfumes';

test('loadStoredPerfumes returns full 26 world perfumes', () => {
  const perfumes = loadStoredPerfumes();
  assert.equal(perfumes.length, 26);
  assert.ok(perfumes.some((p) => p.name.includes('سوفاج')));
  assert.ok(perfumes.some((p) => p.name.includes('أفينتوس')));
  assert.ok(perfumes.some((p) => p.name.includes('باكارات')));
});

test('admin login verifies PIN correctly', () => {
  assert.equal(loginAdmin('wrongPin', 'admin123'), false);
  assert.equal(loginAdmin('admin123', 'admin123'), true);
  assert.equal(loginAdmin('  admin123  ', 'admin123'), true);
});

test('generateWhatsAppOrderUrl produces valid link with prices and details', () => {
  const config = loadStoreConfig();
  const testItem = {
    perfume: PERFUMES[0],
    quantity: 2,
    selectedVolume: '100ml',
  };

  const url = generateWhatsAppOrderUrl([testItem], config, {
    fullName: 'أحمد علي',
    phone: '0501234567',
    city: 'الرياض',
    address: 'شارع التحلية',
    paymentMethod: 'الدفع عند الاستلام',
  });

  assert.ok(url.startsWith('https://wa.me/'));
  assert.ok(url.includes('wa.me/966500000000'));
  // Text content checks in decoded URI
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes(PERFUMES[0].name));
  assert.ok(decoded.includes('أحمد علي'));
  assert.ok(decoded.includes('الرياض'));
});
