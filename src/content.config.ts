import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.(md|mdx)" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      heroImageAlt: z.string(),
    }),
});

const tabs = defineCollection({
  loader: glob({ base: "./src/content/tabs", pattern: "**/*.(md|mdx)" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().gte(0),
  }),
});

const experiences = defineCollection({
  loader: file("src/content/experiences.json"),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    period: z.string(),
    location: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    highlights: z.array(z.string()),
  }),
});

export const collections = { blog, tabs, experiences };
