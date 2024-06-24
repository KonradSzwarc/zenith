import { marked, Renderer } from 'marked';

const renderer = new Renderer();

renderer.link = ({ href, text, title }) => {
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

/** Converts given markdown to HTML string. */
export function markdownToHtml(text: string) {
  return marked.parse(text, { async: false, renderer }) as string;
}
