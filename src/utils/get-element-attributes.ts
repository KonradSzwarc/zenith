export function getElementAttributes(html: string) {
  const result: Record<string, string | number | boolean> = {};

  const tagMatch = html.match(/<(\w+)([^>]*)>/);
  if (!tagMatch) {
    return result;
  }

  const attributesString = tagMatch[2] ?? '';

  const attrRegex = /(\w+)(?:="([^"]*)")?/g;
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
