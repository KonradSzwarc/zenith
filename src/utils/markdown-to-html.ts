import { marked } from 'marked';

export function markdownToHtml(text: string) {
  return marked.parse(text, { async: false }) as string;
}
