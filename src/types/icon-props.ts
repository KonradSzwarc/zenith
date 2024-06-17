import type { HTMLAttributes } from 'astro/types';

export interface IconProps extends HTMLAttributes<'svg'> {
  width?: number;
  height?: number;
  style?: Record<string, unknown>;
}
