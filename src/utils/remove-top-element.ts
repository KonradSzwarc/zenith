export function removeTopElement(html: string): string {
  const trimmedHtml = html.trim();
  const regex = /^<[^>]+>([\s\S]*?)<\/[^>]+>$/;

  const match = trimmedHtml.match(regex);

  return match?.[1] ?? trimmedHtml;
}
