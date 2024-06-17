import type { AstroGlobal } from 'astro';
import type { Locale } from 'date-fns';

import type { IconStore, Theme } from '@/types/context';

export interface WebContext {
  locale: Locale;
  dateFormat: string;
  iconStore: IconStore;
  theme: Theme;
  pdf?: {
    path: string;
    label: string;
    filename: string;
  };
}

export function initializeWebContext(astro: AstroGlobal, data: Omit<WebContext, 'iconStore'>) {
  const context: WebContext = {
    ...data,
    iconStore: new Map<string, string | Promise<string>>(),
  };

  astro.locals.globalContext = context;
}
