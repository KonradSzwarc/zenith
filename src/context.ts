import type { Locale } from 'date-fns';
import { format } from 'date-fns';

interface State {
  locale: Locale;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system' | 'custom';
  iconStore: Map<string, string | Promise<string>>;
}

function createContext() {
  const state: State = {} as State;

  function assertInitialized() {
    if (Object.keys(state).length === 0) {
      throw new Error('Context not initialized');
    }
  }

  function initialize({ locale, dateFormat, theme }: Omit<State, 'iconStore'>) {
    state.locale = locale;
    state.dateFormat = dateFormat;
    state.theme = theme;
    state.iconStore = new Map<string, string | Promise<string>>();
  }

  function formatDate(date: Date) {
    assertInitialized();

    return format(date, state.dateFormat, { locale: state.locale });
  }

  function getLang() {
    assertInitialized();

    return state.locale.code;
  }

  function getIconStore() {
    assertInitialized();

    return state.iconStore;
  }

  function getTheme() {
    assertInitialized();

    return state.theme;
  }

  return { initialize, formatDate, getLang, getIconStore, getTheme };
}

export const context = createContext();
