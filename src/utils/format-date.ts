import type { AstroGlobal } from 'astro';
import { format } from 'date-fns';

import type { ContextSlice } from '@/types/context';

import { getGlobalContext } from './get-global-context';

/** Parses given date to a string based on configuration stored in the global context. */
export function formatDate(date: Date, astro: AstroGlobal) {
  const context = getGlobalContext<ContextSlice<'locale' | 'dateFormat'>>(astro);

  return format(date, context.dateFormat, { locale: context.locale });
}
