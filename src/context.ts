import type { Locale } from 'date-fns';
import { format } from 'date-fns';

interface State {
  locale: Locale;
  dateFormat: string;
  iconStore: Map<string, string | Promise<string>>;
}

function createContext() {
  const state: State = {} as State;

  function assertInitialized() {
    if (Object.keys(state).length === 0) {
      throw new Error('Context not initialized');
    }
  }

  function initialize({ locale, dateFormat }: Omit<State, 'iconStore'>) {
    state.locale = locale;
    state.dateFormat = dateFormat;
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

  return { initialize, formatDate, getLang, getIconStore };
}

export const context = createContext();
