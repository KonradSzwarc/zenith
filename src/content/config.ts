import { defineCollection, reference, z } from 'astro:content';

const labelledValueSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const collections = {
  achievements: defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string(),
      url: z.string().url().optional(),
      date: z.date().optional(),
      issuer: z.string().optional(),
      icon: z.string().optional(),
      skills: z.array(reference('skills')).optional(),
    }),
  }),
  basics: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        label: z.string().optional(),
        image: image().or(z.string()).optional(),
        birthdate: z.date().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        details: z.array(labelledValueSchema).min(1).optional(),
        socials: z.array(
          z.object({
            label: z.string(),
            icon: z.string(),
            url: z.string().url(),
          }),
        ),
      }),
  }),
  education: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        institution: z.string(),
        image: image().or(z.string()).optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        details: z.array(labelledValueSchema).min(1).optional(),
        skills: z.array(reference('skills')).min(1).optional(),
      }),
  }),
  favorites: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        url: z.string().url(),
        image: image().or(z.string()).optional(),
      }),
  }),
  interests: defineCollection({
    type: 'content',
    schema: z.object({
      name: z.string(),
      icon: z.string().optional(),
    }),
  }),
  jobs: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        position: z.string(),
        organization: z.string(),
        image: image().or(z.string()).optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        details: z.array(labelledValueSchema).min(1).optional(),
        skills: z.array(reference('skills')).min(1).optional(),
      }),
  }),
  metadata: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        openGraph: z
          .object({
            image: image().or(z.string()).optional(),
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
        image: image().or(z.string()).optional(),
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
          position: z.string().optional(),
          relation: z.string().optional(),
          image: image().or(z.string()).optional(),
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
  translations: defineCollection({
    type: 'data',
    schema: z.record(z.string()),
  }),
};
