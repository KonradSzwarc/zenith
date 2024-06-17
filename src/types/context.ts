import type { PdfContext } from '@/pdf/utils/initialize-pdf-context';
import type { WebContext } from '@/web/utils/initialize-web-context';

export type Theme = 'light' | 'dark' | 'system' | 'custom';

export type IconStore = Map<string, string | Promise<string>>;

type Context = WebContext & PdfContext;

export type ContextSlice<T extends keyof Context> = Pick<Context, T>;
