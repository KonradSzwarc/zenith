import type { Locale } from 'date-fns';

export type Theme = 'light' | 'dark' | 'system' | 'custom';

export type IconStore = Map<string, string | Promise<string>>;

export interface PageContext {
  locale: Locale;
  dateFormat: string;
  theme: Theme;
  iconStore: IconStore;
}

export interface PdfContext {
  locale: Locale;
  dateFormat: string;
}

type Context = PageContext & PdfContext;

export type ContextSlice<T extends keyof Context> = Pick<Context, T>;
