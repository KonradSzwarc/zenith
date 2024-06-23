import type { AstroGlobal } from 'astro';
import type { Locale } from 'date-fns';
import type { i18n } from 'i18next';
import i18next from 'i18next';

import type { IconStore, Theme } from '@/types/context';
import type { AsyncEntry } from '@/types/entries';

export interface WebContextData extends Omit<WebContext, 'iconStore' | 'i18n'> {
  translations: AsyncEntry<'translations'>;
}

export interface WebContext {
  i18n: i18n;
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

export async function initializeWebContext(astro: AstroGlobal, data: WebContextData) {
  await i18next.init({
    lng: data.locale.code,
    resources: { [data.locale.code]: { translation: (await data.translations).data } },
  });

  const context: WebContext = {
    ...data,
    i18n: i18next,
    iconStore: new Map<string, string | Promise<string>>(),
  };

  astro.locals.globalContext = context;
}
