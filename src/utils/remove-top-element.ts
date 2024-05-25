export function removeTopElement(html: string): string {
  const regex = /^<[^>]+>([\s\S]*?)<\/[^>]+>$/;

  const match = html.match(regex);

  return match?.[1] ?? html;
}
