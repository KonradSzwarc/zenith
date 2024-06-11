import type { Locale } from 'date-fns';
import { format } from 'date-fns';

interface State {
  locale: Locale;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system' | 'custom';
  iconStore: Map<string, string | Promise<string>>;
}

class Context {
  private state: State = {} as State;

  private assertInitialized() {
    if (Object.keys(this.state).length === 0) {
      throw new Error('Context not initialized');
    }
  }

  initialize(data: Omit<State, 'iconStore'>) {
    this.state = {
      ...data,
      iconStore: new Map<string, string | Promise<string>>(),
    };
  }

  formatDate(date: Date) {
    this.assertInitialized();

    return format(date, this.state.dateFormat, { locale: this.state.locale });
  }

  get lang() {
    this.assertInitialized();

    return this.state.locale.code;
  }

  get iconStore() {
    this.assertInitialized();

    return this.state.iconStore;
  }

  get theme() {
    this.assertInitialized();

    return this.state.theme;
  }
}

export const context = new Context();
