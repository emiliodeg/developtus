import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.(md|mdx)" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
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

export const collections = { blog, tabs };
