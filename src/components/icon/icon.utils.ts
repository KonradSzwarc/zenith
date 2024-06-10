export async function getIconData(name: string) {
  /** Is a path of an icon placed in src/icons. */
  const isLocalIcon = !name.includes(':');

  /** Is a name of an icon that needs to be fetched. */
  const isRemoteIcon = name.includes(':') && name.split(':').length === 2;

  if (!isLocalIcon && !isRemoteIcon) {
    throw new Error(
      `Invalid icon name: ${name}. Remote icons must be in "set:icon" format. Local icons cannot contain ":" in their name.`,
    );
  }

  if (isLocalIcon) {
    return { type: 'local', name } as const;
  }

  const [set, icon] = name.split(':') as [string, string];

  return { type: 'remote', set, icon } as const;
}

export function getStylesWithColor(color?: string, style?: Record<string, unknown>): Record<string, unknown> {
  if (!color) return style || {};

  const newStyle = style ? { ...style } : {};

  const [light, dark] = color.split('|');

  newStyle.color = `light-dark(${light}, ${dark || light})`;

  return newStyle;
}
