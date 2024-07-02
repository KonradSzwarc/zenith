/** Property with a default value that can be disabled by providing null or false. */
export type Configurable<T> = T | null | undefined;

/** Determines if element that uses a Configurable property should be displayed. */
export function shouldDisplay<T>(value: Configurable<T>): value is T | undefined {
  return value !== null;
}
