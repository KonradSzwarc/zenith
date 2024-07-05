import type { AstroGlobal } from 'astro';

import type { ContextSlice } from '@/types/context';

import { getGlobalContext } from './get-global-context';

/** Determines if assets should be loaded eagerly or lazily by default. */
export function getLoadingStrategy(astro: AstroGlobal): 'eager' | 'lazy' {
  const context = getGlobalContext<ContextSlice<'type'>>(astro, { optional: true });

  const isLazyLoaded = context?.type === 'web' && !import.meta.env.CI_CHECKS;

  return isLazyLoaded ? 'lazy' : 'eager';
}
