// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import decap from "astro-decap";

import netlify from "@astrojs/netlify";
import decapCMS from "astro-decap";

// https://astro.build/config
export default defineConfig({
  site: "https://developtus.com",

  integrations: [
    mdx(),
    sitemap(),
    decapCMS({
      injectOAuthRoute: true,
      getEnvObjectFromRequestContext: () => import.meta.env,
      cmsConfig: {
        local_backend: import.meta.env.MODE === "development",
        backend: { name: "git-gateway", branch: "main" },
        media_folder: "public",
        public_folder: "public",
        collections: [
          {
            label: "Blog posts",
            name: "blog",
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
                required: false,
              },
              { name: "body", widget: "markdown" },
            ],
          },
        ],
      },
    }),
  ],
  adapter: netlify(),
});
