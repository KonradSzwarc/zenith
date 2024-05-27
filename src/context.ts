import type { Locale } from 'date-fns';
import { format } from 'date-fns';

interface State {
  locale: Locale;
  dateFormat: string;
}

function createContext() {
  const state: State = {} as State;

  function assertInitialized() {
    if (Object.keys(state).length === 0) {
      throw new Error('Context not initialized');
    }
  }

  function initialize({ locale, dateFormat }: State) {
    state.locale = locale;
    state.dateFormat = dateFormat;
  }

  function formatDate(date: Date) {
    assertInitialized();

    return format(date, state.dateFormat, { locale: state.locale });
  }

  function getLang() {
    assertInitialized();

    return state.locale.code;
  }

  return { initialize, formatDate, getLang };
}

export const context = createContext();
