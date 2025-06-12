// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import decapCMS from "astro-decap";

// https://astro.build/config
export default defineConfig({
  site: "https://developtus.com",
  base: '/',
  integrations: [
    mdx(),
    sitemap(),
    decapCMS({
      injectOAuthRoute: true,
      getEnvObjectFromRequestContext: () => import.meta.env,
      cmsConfig: {
        local_backend: import.meta.env.MODE === "development",
        backend: {
          name: "github",
          repo: "emiliodeg/developtus",
          branch: "main",
          commit_messages: {
            create: 'Create {{collection}} "{{slug}}"',
            update: 'Update {{collection}} "{{slug}}"',
            delete: 'Delete {{collection}} "{{slug}}"',
            deleteMedia: 'Delete media file "{{filename}}"',
            openAuthoring: 'Open authoring for {{collection}} "{{slug}}"',
            uploadMedia: 'Upload media file "{{filename}}"',
          },
        },
        media_folder: "src/assets",
        public_folder: "public",
        collections: [
          {
            label: "Blog posts",
            name: "blog",
            create: true,
            slug: "{{slug}}",
            folder: "src/content/blog",
            fields: [
              { name: "title", label: "Title", widget: "string" },
              { name: "description", label: "Description", widget: "text" },
              {
                name: "pubDate",
                label: "Publication date",
                widget: "datetime",
              },
              {
                name: "updatedDate",
                label: "Updated date",
                widget: "datetime",
                required: false,
              },
              {
                name: "heroImage",
                label: "Hero image",
                widget: "image",
              },
              {
                name: "heroImageAlt",
                label: "Hero image alt text",
                widget: "string",
              },
              { name: "body", widget: "markdown" },
            ],
          },
          {
            label: "Tabs",
            name: "tabs",
            create: true,
            slug: "{{slug}}",
            folder: "src/content/tabs",
            fields: [
              { name: "title", label: "Title", widget: "string" },
              { name: "description", label: "Description", widget: "text" },
              { name: "order", label: "Order", widget: "number" },
              { name: "body", widget: "markdown" },
            ],
          },
        ],
      },
    }),
  ],
  adapter: netlify(),
  image: {
    experimentalLayout: 'constrained',
  },
  experimental: {
    responsiveImages: true,
  },
});
