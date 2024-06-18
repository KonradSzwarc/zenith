import type { AstroGlobal } from 'astro';
import type { CollectionEntry } from 'astro:content';
import type { Locale } from 'date-fns';
import type { i18n } from 'i18next';
import i18next from 'i18next';

interface PdfContextData extends Omit<PdfContext, 'i18n'> {
  translations: CollectionEntry<'translations'> | Promise<CollectionEntry<'translations'>>;
}

export interface PdfContext {
  i18n: i18n;
  locale: Locale;
  dateFormat: string;
  website?: string;
}

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
