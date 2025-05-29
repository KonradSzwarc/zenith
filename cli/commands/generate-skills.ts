import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import type { SimpleIcon } from 'simple-icons';
import * as simpleIcons from 'simple-icons';

import { SKILLS_CONTENT_PATH } from '../constants';

// Helper function to sanitize titles for filenames and icon slugs
function safeSlug(title: string): string {
  if (typeof title !== 'string') return '';
  let slug = title.toLowerCase();
  slug = slug.replace(/\+/g, 'plus');
  slug = slug.replace(/\./g, 'dot');
  slug = slug.replace(/&/g, 'and');
  slug = slug.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  slug = slug.replace(/[^a-z0-9-]/g, '');
  slug = slug.replace(/-+/g, '-');
  slug = slug.trim();
  return slug;
}

// Helper function to process source URLs
function processSourceUrl(sourceUrl: string | undefined): string {
  if (!sourceUrl) return '';
  try {
    const parsedUrl = new URL(sourceUrl);
    if (parsedUrl.hostname === 'commons.wikimedia.org') return '';
    if (parsedUrl.hostname === 'github.com') {
      const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return `https://github.com/${pathParts[0]}/${pathParts[1]}/`;
      }
      return 'https://github.com/'; // Fallback
    }
    return `${parsedUrl.protocol}//${parsedUrl.hostname}/`;
  } catch (e) {
    console.error(chalk.red(`Error processing URL "${sourceUrl}":`), e);
    return '';
  }
}

async function generateSkillMdx(userInputSlug: string): Promise<void> {
  const iconCandidate = Object.values(simpleIcons).find((icon) => {
    // Type guard to ensure icon is a valid SimpleIcon object
    if (
      icon &&
      typeof icon === 'object' &&
      'slug' in icon &&
      typeof icon.slug === 'string' &&
      'title' in icon &&
      typeof icon.title === 'string' &&
      'hex' in icon &&
      typeof icon.hex === 'string'
    ) {
      const officialSlug = icon.slug;
      // Process title to a comparable format: lowercase, remove '.', '+', and spaces
      const processedTitle = icon.title.toLowerCase().replace(/[.\s+]/g, '');
      const processedInputSlug = userInputSlug.toLowerCase().replace(/[.\s+-]/g, '');
      return officialSlug === userInputSlug || processedTitle === processedInputSlug;
    }
    return false;
  });

  const iconData = iconCandidate as SimpleIcon | undefined;

  if (!iconData) {
    console.warn(chalk.yellow(`Icon for user-provided slug '${userInputSlug}' not found in simple-icons. Skipping.`));
    return;
  }

  const skillName = iconData.title;
  const mdxSlug = safeSlug(iconData.slug);
  const iconRef = `simple-icons:${mdxSlug}`;
  const color = `#${iconData.hex}`;
  const url = processSourceUrl(iconData.source);

  // Ensure single quotes in skillName are properly escaped for YAML
  const mdxContent = `---
name: '${skillName.replace(/'/g, "''")}'
icon: '${iconRef}'
color: '${color}'
url: '${url}'
---
`;

  const outputDir = SKILLS_CONTENT_PATH;
  await fs.mkdir(outputDir, { recursive: true });
  const filePath = path.join(outputDir, `${mdxSlug}.mdx`);

  try {
    await fs.writeFile(filePath, mdxContent);
    console.log(chalk.green(`Successfully created MDX file: ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Failed to write MDX file for '${skillName}' at '${filePath}':`), error);
  }
}

export const generateSkillsCommand = new Command('generate-skills')
  .description('Generate MDX files for specified skills from the simple-icons package.')
  .option(
    '-i, --icons <slugs>',
    'Comma-separated list of icon slugs to generate (e.g., github,typescript,react,node-js)',
  )
  .action(async (options) => {
    if (!SKILLS_CONTENT_PATH) {
      console.error(chalk.red('SKILLS_CONTENT_PATH is not defined. Ensure it is exported from cli/constants.ts'));
      process.exit(1);
    }
    if (!options.icons) {
      console.error(
        chalk.red('Error: --icons option is required. Please provide a comma-separated list of icon slugs.'),
      );
      process.exit(1);
    }
    const iconSlugs: string[] = options.icons
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);

    if (iconSlugs.length === 0) {
      console.error(chalk.red('Error: No icon slugs provided.'));
      process.exit(1);
    }

    console.log(chalk.blue(`Generating MDX for ${iconSlugs.length} skill(s): ${iconSlugs.join(', ')}`));

    for (const slug of iconSlugs) {
      await generateSkillMdx(slug);
    }
    console.log(chalk.blue('Skill MDX generation complete.'));
  });
