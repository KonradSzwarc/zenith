import type { AstroGlobal } from 'astro';

import type { PageContext } from '@/types/context';

export function initializePageContext(astro: AstroGlobal, data: Omit<PageContext, 'iconStore' | 'env'>) {
  const context: PageContext = {
    env: 'page',
    iconStore: new Map<string, string | Promise<string>>(),
    ...data,
  };

  astro.locals.globalContext = context;
}
