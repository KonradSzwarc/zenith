import type { CollectionEntry, CollectionKey } from 'astro:content';

/** Entry or a promise returning entry of an Astro content collection. */
export type AsyncEntry<C extends CollectionKey> = CollectionEntry<C> | Promise<CollectionEntry<C>>;
