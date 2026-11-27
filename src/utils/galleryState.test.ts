import test from 'node:test';
import assert from 'node:assert/strict';
import { PERFUMES } from '../data/perfumes';
import {
  completeBottleTransition,
  findPerfumeById,
  findPerfumeIndexById,
  getMobileAlcoveColSpan,
  getNextPerfumeIndex,
  getPrevPerfumeIndex,
  nextBottleTransition,
  resolveGalleryKeyAction,
  validatePerfumeCatalog,
} from './galleryState';

test('perfume catalog contains 5 valid, unique fragrances with spotlight colors', () => {
  assert.equal(PERFUMES.length, 5);
  const result = validatePerfumeCatalog(PERFUMES);
  assert.equal(result.valid, true, result.errors.join(', '));
});

test('index cycling wraps seamlessly in both directions', () => {
  assert.equal(getNextPerfumeIndex(0, 5), 1);
  assert.equal(getNextPerfumeIndex(4, 5), 0);
  assert.equal(getPrevPerfumeIndex(0, 5), 4);
  assert.equal(getPrevPerfumeIndex(3, 5), 2);
  assert.equal(getNextPerfumeIndex(0, 0), -1);
});

test('findPerfumeById and findPerfumeIndexById resolve items accurately', () => {
  const found = findPerfumeById(PERFUMES, 'midnight-tide');
  assert.ok(found);
  assert.equal(found.name, 'ليل البحر');
  assert.equal(findPerfumeIndexById(PERFUMES, 'midnight-tide'), 3);
  assert.equal(findPerfumeById(PERFUMES, 'unknown-id'), null);
  assert.equal(findPerfumeIndexById(PERFUMES, null), 0);
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
  assert.deepEqual(
    resolveGalleryKeyAction('ArrowLeft', {
      isDetailOpen: false,
      isDrawerOpen: true,
    }),
    { type: 'none' },
  );
});

test('getMobileAlcoveColSpan builds a 2-over-3 architectural layout for 5 fragrances', () => {
  const spans = PERFUMES.map((_, idx) => getMobileAlcoveColSpan(idx, PERFUMES.length));
  assert.deepEqual(spans, [
    'col-span-3',
    'col-span-3',
    'col-span-2',
    'col-span-2',
    'col-span-2',
  ]);
});

test('nextBottleTransition and completeBottleTransition track fade-out and fade-in cleanly', () => {
  const initial = { activeId: 'amber-mirage', exitingId: null, transitionKey: 0 };

  const unchanged = nextBottleTransition(initial, 'amber-mirage');
  assert.strictEqual(unchanged, initial);

  const switched = nextBottleTransition(initial, 'twilight-rose');
  assert.deepEqual(switched, {
    activeId: 'twilight-rose',
    exitingId: 'amber-mirage',
    transitionKey: 1,
  });

  const settled = completeBottleTransition(switched);
  assert.deepEqual(settled, {
    activeId: 'twilight-rose',
    exitingId: null,
    transitionKey: 1,
  });

  assert.strictEqual(completeBottleTransition(settled), settled);
});
