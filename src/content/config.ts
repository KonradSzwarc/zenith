import { defineCollection, reference, z } from 'astro:content';

const labelledValueSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const linkSchema = z.object({
  label: z.string(),
  icon: z.string().optional(),
  url: z.string().url(),
});

export const collections = {
  achievements: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        date: z.date(),
        image: image().optional(),
        issuer: z.string().optional(),
        links: z.array(linkSchema).optional(),
        skills: z.array(reference('skills')).optional(),
      }),
  }),
  basics: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        label: z.string().optional(),
        image: image().optional(),
        birthdate: z.date().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        details: z.array(labelledValueSchema).default([]),
        resume: z
          .object({
            url: z.string(),
            label: z.string(),
            filename: z.string(),
          })
          .optional(),
      }),
  }),
  education: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        institution: z.string(),
        image: image().optional(),
        startDate: z.date(),
        endDate: z.date().or(z.string()).optional(),
        details: z.array(labelledValueSchema).optional(),
        links: z.array(linkSchema).optional(),
        skills: z.array(reference('skills')).optional(),
      }),
  }),
  favorites: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        image: image().optional(),
        url: z.string().url().optional(),
      }),
  }),
  interests: defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string(),
      icon: z.string().optional(),
      color: z.string().optional(),
    }),
  }),
  metadata: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        favicon: image().optional(),
        language: z.string().default('en'),
        openGraph: z
          .object({
            image: image().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          })
          .optional(),
      }),
  }),
  projects: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        image: image().optional(),
        startDate: z.date(),
        endDate: z.date().or(z.string()).optional(),
        details: z.array(labelledValueSchema).optional(),
        links: z.array(linkSchema).optional(),
        skills: z.array(reference('skills')).optional(),
      }),
  }),
  references: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        author: z.string(),
        avatar: image().optional(),
        position: z.string().optional(),
        logo: z.object({ source: z.string(), alt: z.string() }).optional(),
      }),
  }),
  skills: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        icon: image().or(z.string()).optional(),
        color: z.string().optional(),
        level: z
          .custom<`${number}/${number}`>(
            (value) => {
              const [current, max] = value.split('/').map(Number);

              return !isNaN(current) && !isNaN(max) && current <= max;
            },
            { message: "Skill level must be in the format 'current/max' where current <= max." },
          )
          .optional(),
        url: z.string().url().optional(),
      }),
  }),
  socials: defineCollection({
    type: 'data',
    schema: z.object({
      label: z.string(),
      icon: z.string(),
      url: z.string().url(),
    }),
  }),
  work: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        position: z.string(),
        organization: z.string(),
        image: image().optional(),
        startDate: z.date(),
        endDate: z.date().or(z.string()).optional(),
        details: z.array(labelledValueSchema).optional(),
        links: z.array(linkSchema).optional(),
        skills: z.array(reference('skills')).optional(),
      }),
  }),
};
