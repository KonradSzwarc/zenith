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
type Component = (args: any) => unknown;

type SectionBase<C extends keyof ContentEntryMap> = {
  /** Name of the folder within `src/content` to use for the section content. */
  collection: C;

  /** Title displayed above the section content. */
  title: string;

  /** Unique identifier for the section. Used to display the sidebar. */
  id?: string;
};

type SectionEntries<C extends keyof ContentEntryMap, P extends Component> = Omit<ComponentProps<P>, 'entry'> & {
  /** Names of the files within `src/content/[collection]` to use for the section content. */
  entries: ValidContentEntrySlug<C>[];
};

/** Section where entries are defined directly. */
type FlatSection<C extends keyof ContentEntryMap, P extends Component> = SectionBase<C> & SectionEntries<C, P>;

/** Section where entries are defined within subsections. */
type NestedSection<C extends keyof ContentEntryMap, P extends Component> = SectionBase<C> & {
  subsections: (SectionEntries<C, P> & {
    /** Title displayed above the subsection content. */
    title: string;
  })[];
};

export type TemplateSection =
  | FlatSection<'achievements', typeof Achievement>
  | FlatSection<'education', typeof Education>
  | FlatSection<'favorites', typeof Education>
  | NestedSection<'favorites', typeof Favorite>
  | FlatSection<'interests', typeof Interest>
  | FlatSection<'jobs', typeof Job>
  | FlatSection<'projects', typeof Project>
  | FlatSection<'references', typeof Reference>
  | FlatSection<'skills', typeof Skill>
  | NestedSection<'skills', typeof Skill>;
