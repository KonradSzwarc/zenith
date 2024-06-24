import type { AstroGlobal } from 'astro';
import type { Locale } from 'date-fns';
import type { i18n } from 'i18next';
import i18next from 'i18next';

import type { AsyncEntry } from '@/types/entries';

export interface PdfContextData extends Omit<PdfContext, 'i18n'> {
  translations: AsyncEntry<'translations'>;
}

export interface PdfContext {
  /** Initialized instance of i18next. */
  i18n: i18n;

  /** Locale imported from date-fns/locale. */
  locale: Locale;

  /** [Format](https://date-fns.org/v3.6.0/docs/format) of all dates across the resume. */
  dateFormat: string;

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
    i18n: i18next,
    website: data.website ? `${astro.url.protocol}//${astro.url.host}${data.website}` : undefined,
  };

  astro.locals.globalContext = context;
}
