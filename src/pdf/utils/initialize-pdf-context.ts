import type { AstroGlobal } from 'astro';
import type { Locale } from 'date-fns';
import type { i18n } from 'i18next';
import i18next from 'i18next';

import type { IconStore } from '@/types/context';
import type { AsyncEntry } from '@/types/entries';

export interface PdfContextData extends Omit<PdfContext, 'type' | 'iconStore' | 'i18n'> {
  translations: AsyncEntry<'translations'>;
}

export interface PdfContext {
  type: 'pdf';

  /** Initialized instance of i18next. */
  i18n: i18n;

  /** Locale imported from date-fns/locale. */
  locale: Locale;

  /** [Format](https://date-fns.org/docs/format) of all dates across the resume. */
  dateFormat: string;

  /** Store used for server icon caching. */
  iconStore: IconStore;

  /** Path of the website linked in the resume. Leave `/` for index page. */
  website?: string;
}

/** Initializes global context for a pdf resume. */
export async function initializePdfContext(astro: AstroGlobal, data: PdfContextData) {
  await i18next.init({
    lng: data.locale.code,
    resources: { [data.locale.code]: { translation: (await data.translations).data } },
  });

  const context: PdfContext = {
    ...data,
    type: 'pdf',
    i18n: i18next,
    iconStore: new Map<string, string | Promise<string>>(),
    website: getWebsiteUrl(astro, data.website),
  };

  astro.locals.globalContext = context;
}

function getWebsiteUrl(astro: AstroGlobal, providedUrl?: string) {
  if (!providedUrl?.startsWith('/')) {
    return providedUrl;
  }

  if (!astro.site) {
    throw new Error('To generate PDFs with relative path, you must set the `site` field in your astro.config.js.');
  }

  return `${astro.site.protocol}//${astro.site.host}${providedUrl}`;
}
