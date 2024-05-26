import type { AnyEntryMap, CollectionEntry } from 'astro:content';

export function selectEntriesBySlug<C extends keyof AnyEntryMap, E extends CollectionEntry<C> & { slug: string }>(
  collection: E[],
  slugs: E['slug'][],
) {
  const map = new Map<E['slug'], E>();
  collection.forEach((entry) => map.set(entry.slug, entry));

  return slugs.map((slug) => map.get(slug)).filter(Boolean);
}
