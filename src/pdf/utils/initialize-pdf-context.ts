import type { AstroGlobal } from 'astro';

import type { PdfContext } from '@/types/context';

export function initializePdfContext(astro: AstroGlobal, data: Omit<PdfContext, 'iconStore'>) {
  astro.locals.globalContext = {
    ...data,
    iconStore: new Map<string, string | Promise<string>>(),
  };
}
