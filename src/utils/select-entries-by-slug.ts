import type { AnyEntryMap, CollectionEntry } from 'astro:content';
import type { Split } from 'type-fest';

export function selectEntriesBySlug<C extends keyof AnyEntryMap, E extends CollectionEntry<C> & { slug: string }>(
  collection: E[],
  slugs: E['slug'][],
) {
  const map = new Map<E['slug'], E>();

  collection.forEach((entry) => map.set(entry.slug, entry));

  return slugs.map((slug) => map.get(slug)).filter(Boolean);
}

export function selectEntriesBySlugPrefix<
  C extends keyof AnyEntryMap,
  E extends CollectionEntry<C> & { slug: string },
  P extends Split<E['slug'], '/'>[0] & string,
>(collection: E[], prefix: P) {
  return collection.filter((entry) => entry.slug.startsWith(prefix)) as (E & { slug: `${P}/${string}` })[];
}
