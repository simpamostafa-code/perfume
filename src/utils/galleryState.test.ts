import test from 'node:test';
import assert from 'node:assert/strict';
import { PERFUMES } from '../data/perfumes';
import {
  completeBottleTransition,
  filterPerfumes,
  findPerfumeById,
  findPerfumeIndexById,
  getMobileAlcoveColSpan,
  getNextPerfumeIndex,
  getPrevPerfumeIndex,
  nextBottleTransition,
  resolveGalleryKeyAction,
  validatePerfumeCatalog,
} from './galleryState';

test('perfume catalog contains valid, unique world-famous fragrances with spotlight colors', () => {
  assert.ok(PERFUMES.length >= 20, 'Catalog should contain at least 20 international perfumes');
  const result = validatePerfumeCatalog(PERFUMES);
  assert.equal(result.valid, true, result.errors.join(', '));
});

test('index cycling wraps seamlessly in both directions', () => {
  const total = PERFUMES.length;
  assert.equal(getNextPerfumeIndex(0, total), 1);
  assert.equal(getNextPerfumeIndex(total - 1, total), 0);
  assert.equal(getPrevPerfumeIndex(0, total), total - 1);
  assert.equal(getPrevPerfumeIndex(3, total), 2);
  assert.equal(getNextPerfumeIndex(0, 0), -1);
});

test('findPerfumeById and findPerfumeIndexById resolve items accurately', () => {
  const found = findPerfumeById(PERFUMES, 'dior-sauvage');
  assert.ok(found);
  assert.equal(found.name, 'سوفاج إكسير');
  assert.equal(found.brand, 'كريستيان ديور');
  assert.equal(findPerfumeIndexById(PERFUMES, 'dior-sauvage'), 0);
  assert.equal(findPerfumeById(PERFUMES, 'unknown-id'), null);
  assert.equal(findPerfumeIndexById(PERFUMES, null), 0);
});

test('filterPerfumes handles category filtering and full-text keyword search', () => {
  const menPerfumes = filterPerfumes(PERFUMES, 'men', '');
  assert.ok(menPerfumes.length > 0);
  assert.ok(menPerfumes.every((p) => p.category === 'men'));

  const diorSearch = filterPerfumes(PERFUMES, 'all', 'Dior');
  assert.ok(diorSearch.length >= 2);

  const vanilleSearch = filterPerfumes(PERFUMES, 'all', 'فانيليا');
  assert.ok(vanilleSearch.length > 0);
});

test('resolveGalleryKeyAction handles RTL arrow navigation and Escape correctly', () => {
  assert.deepEqual(
    resolveGalleryKeyAction('ArrowLeft', {
      isDetailOpen: false,
      isDrawerOpen: false,
      isRtl: true,
    }),
    { type: 'next' },
  );
  assert.deepEqual(
    resolveGalleryKeyAction('ArrowRight', {
      isDetailOpen: false,
      isDrawerOpen: false,
      isRtl: true,
    }),
    { type: 'prev' },
  );
  assert.deepEqual(
    resolveGalleryKeyAction('Escape', {
      isDetailOpen: true,
      isDrawerOpen: false,
    }),
    { type: 'close' },
  );
});

test('nextBottleTransition and completeBottleTransition track fade-out and fade-in cleanly', () => {
  const initial = { activeId: 'dior-sauvage', exitingId: null, transitionKey: 0 };

  const unchanged = nextBottleTransition(initial, 'dior-sauvage');
  assert.strictEqual(unchanged, initial);

  const switched = nextBottleTransition(initial, 'bleu-de-chanel');
  assert.deepEqual(switched, {
    activeId: 'bleu-de-chanel',
    exitingId: 'dior-sauvage',
    transitionKey: 1,
  });

  const settled = completeBottleTransition(switched);
  assert.deepEqual(settled, {
    activeId: 'bleu-de-chanel',
    exitingId: null,
    transitionKey: 1,
  });
});
