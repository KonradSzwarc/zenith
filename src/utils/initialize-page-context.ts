import type { AstroGlobal } from 'astro';

import type { PageContext } from '@/types/context';

export function initializePageContext(astro: AstroGlobal, data: Omit<PageContext, 'iconStore'>) {
  astro.locals.globalContext = {
    ...data,
    iconStore: new Map<string, string | Promise<string>>(),
  };
}
