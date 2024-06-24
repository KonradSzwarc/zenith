/** Removes the top element from given HTML string. */
export function removeTopElement(html: string): string {
  const trimmedHtml = html.trim();
  const regex = /^<[^>]+>([\s\S]*?)<\/[^>]+>$/;

  const match = trimmedHtml.match(regex);

  return match?.[1] ?? trimmedHtml;
}

const TAG_WITH_ATTRIBUTES_REGEX = /<(\w+)([^>]*)>/;

/** Returns an object with attributes of the top element in given HTML string. */
export function getElementAttributes(html: string) {
  const result: Record<string, string | number | boolean> = {};

  const attributesString = getAttributesString(html);

  const attrRegex = /([a-zA-Z0-9-]+)(?:="([^"]*)")?/g;
  let match;

  while ((match = attrRegex.exec(attributesString)) !== null) {
    const [, name = '', value] = match;

    if (value === undefined) {
      result[name] = false;
    } else if (!isNaN(Number(value))) {
      result[name] = Number(value);
    } else if (value.toLowerCase() === 'true') {
      result[name] = true;
    } else if (value.toLowerCase() === 'false') {
      result[name] = false;
    } else {
      result[name] = value;
    }
  }

  return result;
}

/** Adds attributes to the top element in given HTML string. */
export function addElementAttributes(html: string, attributes: Record<string, string | number | boolean>) {
  const currentAttributes = getElementAttributes(html);
  const newAttributes = { ...currentAttributes, ...attributes };

  const attributesString = Object.entries(newAttributes)
    .map(([name, value]) => {
      if (value === true) return name;
      if (value === false) return `${name}="false"`;
      return `${name}="${value}"`;
    })
    .join(' ');

  return html.replace(TAG_WITH_ATTRIBUTES_REGEX, `<${getTag(html)} ${attributesString}>`);
}

function getTag(html: string) {
  const tagMatch = html.match(TAG_WITH_ATTRIBUTES_REGEX);
  const tag = tagMatch?.[1];

  if (!tag) {
    throw new Error('Invalid HTML');
  }

  return tag;
}

function getAttributesString(html: string) {
  const tagMatch = html.match(TAG_WITH_ATTRIBUTES_REGEX);
  return tagMatch?.[2]?.trim() ?? '';
}
