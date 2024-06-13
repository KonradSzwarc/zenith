import type { Locale } from 'date-fns';

export type Theme = 'light' | 'dark' | 'system' | 'custom';

export type IconStore = Map<string, string | Promise<string>>;

export interface PageContext {
  env: 'page';
  locale: Locale;
  dateFormat: string;
  iconStore: IconStore;
  theme: Theme;
}

export interface PdfContext {
  env: 'pdf';
  locale: Locale;
  dateFormat: string;
  iconStore: IconStore;
}

type Context = Omit<PageContext, 'env'> & Omit<PdfContext, 'env'> & { env: 'page' | 'pdf' };

export type ContextSlice<T extends keyof Context> = Pick<Context, T>;
