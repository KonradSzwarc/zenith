import { join } from 'node:path';

import type { AstroGlobal } from 'astro';

import type { PdfContext } from '@/types/context';

export function initializePdfContext(astro: AstroGlobal, data: Omit<PdfContext, 'iconStore' | 'env'>) {
  const context: PdfContext = {
    ...data,
    env: 'pdf',
    iconStore: new Map<string, string | Promise<string>>(),
    website: data.website ? join(astro.url.origin, data.website) : undefined,
  };

  astro.locals.globalContext = context;
}
