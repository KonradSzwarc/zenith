import { defineCollection, reference, z } from 'astro:content';

const labelledValueSchema = z.object({
  label: z.string(),
  value: z.string(),
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
        details: z.array(labelledValueSchema).min(1).optional(),
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
        endDate: z.date().optional(),
        details: z.array(labelledValueSchema).min(1).optional(),
        skills: z.array(reference('skills')).min(1).optional(),
      }),
  }),
  favorites: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      url: z.string().url(),
      authors: z.array(z.object({ name: z.string(), url: z.string().url().optional() })).default([]),
    }),
  }),
  interests: defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string(),
      icon: z.string().optional(),
    }),
  }),
  metadata: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        favicon: image().optional(),
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
        description: z.string(),
        image: image().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        details: z.array(labelledValueSchema).min(1).optional(),
        skills: z.array(reference('skills')).min(1).optional(),
      }),
  }),
  references: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        author: z.object({
          name: z.string(),
          role: z.string().optional(),
          relation: z.string().optional(),
          image: image().optional(),
          url: z.string().url().optional(),
        }),
      }),
  }),
  skills: defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string(),
      icon: z.string().optional(),
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
        endDate: z.date().optional(),
        details: z.array(labelledValueSchema).min(1).optional(),
        skills: z.array(reference('skills')).min(1).optional(),
      }),
  }),
};
