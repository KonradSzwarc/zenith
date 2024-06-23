import type { CollectionEntry, CollectionKey } from 'astro:content';

export type AsyncEntry<C extends CollectionKey> = CollectionEntry<C> | Promise<CollectionEntry<C>>;
