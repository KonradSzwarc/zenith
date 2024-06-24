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

type Component = (args: any) => unknown;

type SectionBase<C extends keyof ContentEntryMap> = {
  /** Name of the folder within `src/content` to use for content. */
  collection: C;

  /** Title displayed above the section content. */
  title: string;
};

type SectionEntries<C extends keyof ContentEntryMap, P extends Component> = Omit<ComponentProps<P>, 'entry'> & {
  /** Names of the files within `src/content/[collection]` to use for content. */
  entries: ValidContentEntrySlug<C>[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlatSection<C extends keyof ContentEntryMap, P extends Component> = SectionBase<C> & SectionEntries<C, P>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NestedSection<C extends keyof ContentEntryMap, P extends Component> = SectionBase<C> & {
  subsections: (SectionEntries<C, P> & {
    /** Title displayed above the subsection content. */
    title: string;
  })[];
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
