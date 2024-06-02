import { marked, Renderer } from 'marked';

const renderer = new Renderer();

renderer.link = (href, title, text) => {
  const attributes = [
    href && `href="${href}"`,
    title && `title="${title}"`,
    !href.startsWith('#') && 'target="_blank" rel="noopener noreferrer"',
    'class="underline hover:opacity-75"',
  ]
    .filter(Boolean)
    .join(' ');

  return `<a ${attributes}>${text}</a>`;
};

export function markdownToHtml(text: string) {
  return marked.parse(text, { async: false, renderer }) as string;
}
