import type { HTMLAttributes } from 'astro/types';

/** Base props of all icon components. */
export interface IconProps extends HTMLAttributes<'svg'> {
  width?: number;
  height?: number;
  style?: Record<string, unknown>;
}
