import type { AstroGlobal } from 'astro';

import type { PdfContext } from '@/types/context';

export function initializePdfContext(astro: AstroGlobal, data: Omit<PdfContext, 'iconStore' | 'env'>) {
  const context: PdfContext = {
    env: 'pdf',
    iconStore: new Map<string, string | Promise<string>>(),
    ...data,
  };

  astro.locals.globalContext = context;
}
