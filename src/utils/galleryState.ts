import type { PerfumeItem, FragranceCategory } from '../data/perfumes';

export type GalleryKeyAction =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'open' }
  | { type: 'close' }
  | { type: 'none' };

/**
 * Computes the next perfume index with wrap-around.
 */
export function getNextPerfumeIndex(currentIndex: number, total: number): number {
  if (total <= 0) return -1;
  return (currentIndex + 1 + total) % total;
}

/**
 * Computes the previous perfume index with wrap-around.
 */
export function getPrevPerfumeIndex(currentIndex: number, total: number): number {
  if (total <= 0) return -1;
  return (currentIndex - 1 + total) % total;
}

/**
 * Finds a perfume by its unique ID.
 */
export function findPerfumeById(
  perfumes: readonly PerfumeItem[],
  id: string | null,
): PerfumeItem | null {
  if (!id) return null;
  return perfumes.find((item) => item.id === id) ?? null;
}

/**
 * Returns the 0-based index of a perfume by ID, or 0 if not found.
 */
export function findPerfumeIndexById(
  perfumes: readonly PerfumeItem[],
  id: string | null,
): number {
  if (!id) return 0;
  const idx = perfumes.findIndex((item) => item.id === id);
  return idx >= 0 ? idx : 0;
}

/**
 * Filters perfumes by category and search query (name, brand, notes, family).
 */
export function filterPerfumes(
  perfumes: readonly PerfumeItem[],
  category: FragranceCategory,
  searchQuery: string,
): PerfumeItem[] {
  const query = searchQuery.trim().toLowerCase();

  return perfumes.filter((item) => {
    const matchesCategory =
      category === 'all' || item.category === category;

    if (!matchesCategory) return false;
    if (!query) return true;

    return (
      item.name.toLowerCase().includes(query) ||
      item.nameEn.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.brandEn.toLowerCase().includes(query) ||
      item.family.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.notes.top.toLowerCase().includes(query) ||
      item.notes.heart.toLowerCase().includes(query) ||
      item.notes.base.toLowerCase().includes(query)
    );
  });
}

/**
 * Maps keyboard presses to gallery actions, respecting RTL navigation
 * where ArrowLeft moves forward (next column in RTL) and ArrowRight moves backward.
 */
export function resolveGalleryKeyAction(
  key: string,
  options: { isDetailOpen: boolean; isDrawerOpen: boolean; isRtl?: boolean },
): GalleryKeyAction {
  const isRtl = options.isRtl ?? true;

  if (key === 'Escape') {
    return options.isDrawerOpen || options.isDetailOpen
      ? { type: 'close' }
      : { type: 'none' };
  }

  if (options.isDrawerOpen) {
    return { type: 'none' };
  }

  if (key === 'ArrowLeft') {
    return isRtl ? { type: 'next' } : { type: 'prev' };
  }

  if (key === 'ArrowRight') {
    return isRtl ? { type: 'prev' } : { type: 'next' };
  }

  if (key === 'Enter' && !options.isDetailOpen) {
    return { type: 'open' };
  }

  return { type: 'none' };
}

/**
 * Validates that a perfume catalog contains well-formed entries with unique IDs
 * and valid hex spotlight colors.
 */
export function validatePerfumeCatalog(perfumes: readonly PerfumeItem[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const hexPattern = /^#[0-9A-Fa-f]{6}$/;

  if (perfumes.length === 0) {
    errors.push('Catalog must contain at least one perfume.');
  }

  for (const item of perfumes) {
    if (!item.id.trim()) {
      errors.push('Perfume id must not be empty.');
    } else if (seenIds.has(item.id)) {
      errors.push(`Duplicate perfume id: ${item.id}`);
    }
    seenIds.add(item.id);

    if (!item.name.trim()) {
      errors.push(`Missing name for perfume ${item.id}`);
    }
    if (!item.description.trim()) {
      errors.push(`Missing description for perfume ${item.id}`);
    }
    if (!hexPattern.test(item.spotlightColor)) {
      errors.push(`Invalid hex spotlightColor for ${item.id}: ${item.spotlightColor}`);
    }
    if (!item.image.trim()) {
      errors.push(`Missing image path for perfume ${item.id}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Returns the column span class for mobile bento grid.
 */
export function getMobileAlcoveColSpan(index: number, total: number): string {
  if (total === 5) {
    return index < 2 ? 'col-span-3' : 'col-span-2';
  }
  return 'col-span-3 sm:col-span-2';
}

export interface BottleTransitionState {
  activeId: string;
  exitingId: string | null;
  transitionKey: number;
}

/**
 * Computes the next fade-out / fade-in bottle transition state when switching
 * fragrances in the detail showcase.
 */
export function nextBottleTransition(
  current: BottleTransitionState,
  nextId: string,
): BottleTransitionState {
  if (current.activeId === nextId) {
    return current;
  }
  return {
    activeId: nextId,
    exitingId: current.activeId,
    transitionKey: current.transitionKey + 1,
  };
}

/**
 * Clears the exiting bottle after its fade-out animation completes.
 */
export function completeBottleTransition(
  current: BottleTransitionState,
): BottleTransitionState {
  if (current.exitingId === null) {
    return current;
  }
  return {
    ...current,
    exitingId: null,
  };
}
