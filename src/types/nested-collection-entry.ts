import type { AnyEntryMap, CollectionEntry } from 'astro:content';

export type NestedCollectionEntry<C extends keyof AnyEntryMap, P extends string> = CollectionEntry<C> & {
  slug: `${P}/${string}`;
};
