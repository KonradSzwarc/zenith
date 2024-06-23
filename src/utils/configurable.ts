export type Configurable<T> = T | null | undefined | false;

export function shouldDisplay<T>(value: Configurable<T>): value is T | undefined {
  return value !== false && value !== null;
}
