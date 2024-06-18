import 'i18next';

import en from '@/content/translations/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}
