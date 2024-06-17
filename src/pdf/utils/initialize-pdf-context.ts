import type { AstroGlobal } from 'astro';
import type { Locale } from 'date-fns';

export interface PdfContext {
  locale: Locale;
  dateFormat: string;
  website?: string;
}

export function initializePdfContext(astro: AstroGlobal, data: PdfContext) {
  const context: PdfContext = {
    ...data,
    website: data.website ? `${astro.url.protocol}//${astro.url.host}${data.website}` : undefined,
  };

  astro.locals.globalContext = context;
}
