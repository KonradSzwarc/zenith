/** Joins all provided non-empty strings using given separator. */
export function joinNonEmpty(items: (string | undefined)[], separator: string): string {
  return items
    .map((str) => str?.trim())
    .filter(Boolean)
    .join(separator);
}
