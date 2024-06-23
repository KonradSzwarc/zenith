import type { ComponentProps } from 'astro/types';
import type { ValidContentEntrySlug } from 'astro:content';
import type { ContentEntryMap } from 'astro:content';

import Achievement from '@/web/components/achievement.astro';
import Education from '@/web/components/education.astro';
import Favorite from '@/web/components/favorite.astro';
import Interest from '@/web/components/interest.astro';
import Job from '@/web/components/job.astro';
import Project from '@/web/components/project.astro';
import Reference from '@/web/components/reference.astro';
import { Skill } from '@/web/components/skills';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlatSection<C extends keyof ContentEntryMap, P extends (args: any) => unknown> = Omit<
  ComponentProps<P>,
  'entry'
> & {
  collection: C;
  title: string;
  entries: ValidContentEntrySlug<C>[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NestedSection<C extends keyof ContentEntryMap, P extends (args: any) => unknown> = {
  collection: C;
  title: string;
  subsections: (Omit<ComponentProps<P>, 'entry'> & { title: string; entries: ValidContentEntrySlug<C>[] })[];
};

export type TemplateSection =
  | FlatSection<'achievements', typeof Achievement>
  | FlatSection<'education', typeof Education>
  | NestedSection<'favorites', typeof Favorite>
  | FlatSection<'interests', typeof Interest>
  | FlatSection<'jobs', typeof Job>
  | FlatSection<'projects', typeof Project>
  | FlatSection<'references', typeof Reference>
  | NestedSection<'skills', typeof Skill>;
