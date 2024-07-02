import type { AstroGlobal } from 'astro';

/** Accesses the global context of the page. */
export function getGlobalContext<T extends object>(
  astro: AstroGlobal,
  options: { optional: true },
): Partial<T> | undefined;
export function getGlobalContext<T extends object>(astro: AstroGlobal, options?: { optional?: false }): T;
export function getGlobalContext(astro: AstroGlobal, options?: { optional?: boolean }) {
  if (!options?.optional && !astro.locals.globalContext) {
    throw new Error('Global context not initialized');
  }

  return astro.locals.globalContext;
}
